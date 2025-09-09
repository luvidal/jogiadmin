import nodemailer from 'nodemailer'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import mime from 'mime-types'
import { Pool } from 'pg'

const purify = DOMPurify(new JSDOM('').window)
export const clean = (s: string) => purify.sanitize(s)

export const isDev = process.env.ENVIRONMENT === 'development'
export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
})

export async function execute<T = any>(
  procedure: string,
  params: Record<string, any> = {}
): Promise<T[]> {
  const keys = Object.keys(params)
  const values = Object.values(params)

  const assignments = keys.map((k, i) => `p_${k} := $${i + 1}`).join(', ')
  const sql = `SELECT * FROM ${procedure}(${assignments})`

  try {
    const { rows } = await pool.query(sql, values)
    return rows as T[]
  } catch (err) {
    console.error('Full error:', err)
    const msg = err instanceof Error ? err.message : String(err)
    throw new Error(`[${procedure}] ${msg}`)
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