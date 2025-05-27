import { NextApiRequest, NextApiResponse } from 'next';
import { execute, sendEmail, clean } from '../helpers';

async function inviteuser(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || '';
  const { addressee, label, content, reqfolderid } = req.body;

  const to = clean(addressee);
  const subject = clean(label);
  const safe = clean(content);
  const host = 'https://jogi.cl#client';

  const text = `${safe}\n\nPS Para continuar, visita: ${host}`;
  const html = clean(safe.replace(/\n/g, '<br/>') + `<br/><br/>PS Para continuar, visita: <a href="${host}">${host}</a>`);

  const folderid = await inithook(userid, to, subject, reqfolderid);
  await sendEmail({ to, subject, text, html });

  return res.status(200).json({ msg: 'Invitación enviada existosamente', folderid });
}

export default inviteuser;

async function inithook(analystid: string, email: string, label: string, reqfolderid: string) {
    const results = await execute('_users.sp_get_user', { email });

    const [{ userid }] = results?.length
        ? results
        : await execute('_users.sp_create_user', { email });

    const respoonse = await execute('_analysts.sp_create_hook', { userid, analystid, label, reqfolderid });
    const [{ folderid }] = respoonse;
    return folderid;
}
