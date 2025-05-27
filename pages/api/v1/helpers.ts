import nodemailer from 'nodemailer'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { htmlToText } from 'html-to-text'

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
    throw new Error(isDev ? `${procedure} error: ${msg}` : `[${procedure}] Falló la conexión al servidor`)
  }
}

export function stripHtml(html: string): string {
  return htmlToText(html, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
    ],
  }).trim()
}
