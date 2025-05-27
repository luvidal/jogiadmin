import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { execute, isDev } from '../helpers';

const { window } = new JSDOM('');
const purify = DOMPurify(window);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Método no permitido')
  if (req.headers['x-api-key'] !== process.env.INTERNAL_API_KEY) return res.status(401).end('Unauthorized')

  const { analista, cliente, proyecto, contenido, idcarpeta } = req.body
  if (!isValidEmail(cliente) || !proyecto || !contenido || !idcarpeta)
    return res.status(400).json({ msg: 'Input inválido' })

  const [{ userid: analystid }] = await execute('_users.SP_GET_USER', { email: analista })

  const addressee = purify.sanitize(cliente.trim().toLowerCase())
  const content = purify.sanitize(contenido)
  const label = proyecto
  const reqfolderid = idcarpeta

  const subject = 'Invitación para usar Jogi'
  const host = isDev ? 'http://localhost:3000#client' : 'https://jogi.cl#client'
  const next = 'PS Para continuar, visita: '
  const text = `${content}\n\n${next}${host}`
  const html = `<p>${content}</p><p>${next}<a href="${host}">${host}</a></p>`

  const from = 'no-reply@jogi.cl'
  const folderid = await inithook(analystid, addressee, label, reqfolderid)
  await transporter().sendMail({ from, to: addressee, subject, text, html })

  return res.status(200).json({ msg: 'Invitación enviada existosamente', folderid })
}

async function inithook(analystid: string, addressee: string, label: string, reqfolderid: string) {
    const results = await execute('_users.sp_get_user', { email: addressee });

    const [{ userid }] = results?.length
        ? results
        : await execute('_users.sp_create_user', { email: addressee });

    const respoonse = await execute('_analysts.sp_create_hook', { userid, analystid, label, reqfolderid });
    const [{ folderid }] = respoonse;
    return folderid;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const transporter = () => {
    const user = process.env.SES_SMTP_USER;
    const pass = process.env.SES_SMTP_PASS;
    return nodemailer.createTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: isDev ? 587 : 465,
        secure: !isDev,
        auth: { user, pass }
    });
};


//const ip = req.socket.remoteAddress
//const allowedIPs = ['1.2.3.4'] // replace with jogidbapi IP
//if (!allowedIPs.includes(ip || '')) return res.status(403).end('IP Inválida')