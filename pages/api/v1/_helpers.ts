import nodemailer from 'nodemailer'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import mime from 'mime-types'

const purify = DOMPurify(new JSDOM('').window)
export const clean = (s: string) => purify.sanitize(s)

export const isDev = process.env.ENVIRONMENT === 'development'
export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const sendEmail = async ({ to, subject, text, html }: any) => {
  if (!isEmail(to)) throw new Error('Invalid email')
  const { SES_SMTP_USER: user, SES_SMTP_PASS: pass } = process.env;
  const transport = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: isDev ? 587 : 465,
    secure: !isDev,
    auth: { user, pass },
  })
  return transport.sendMail({
    from: 'no-reply@jogi.cl',
    to: to.trim().toLowerCase(),
    subject: clean(subject),
    html: clean(html),
    text,
  })
}

export async function execute<T = any>(procedure: string, params?: Record<string, any>): Promise<T[]> {
  const url = 'https://jogidbapi.onrender.com'
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Key': process.env.INTERNAL_API_KEY || ''
      },
      body: JSON.stringify({ procedure, params })
    })
    if (!res.ok) throw new Error(await res.text())
    return (await res.json()).data || []

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`${procedure} error:`, msg)
    throw new Error(`Error running ${procedure}: ${msg}`)
  }
}

export const uploadS3 = async (userid: string, doctypeid: string, filename: string, base64: string): Promise<string> => {
  const buffer = Buffer.from(base64, 'base64')
  const mimetype = mime.lookup(filename) || 'application/pdf'
  const size = buffer.length
  const sizekb = Math.ceil(size / 1024) + ' KB'
  const uploadmethod = 'automatic'
  const lastmodified = new Date().toISOString()
  const values = { userid, uploadmethod, filename, mimetype, doctypeid, lastmodified, size, sizekb }

  const [{ cloudid }] = await execute('_cloud.sp_create_file', values)

  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3')
  const s3 = new S3Client({})
  await s3.send(new PutObjectCommand({
    Bucket: 'jogi-files',
    Key: `${userid}/${cloudid}`,
    Body: buffer,
    ContentType: mimetype,
  }))
  return cloudid
}
