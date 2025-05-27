import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function remove(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { notificationid } = req.query;
    await execute('_users.sp_del_notification', { notificationid });
    return res.status(200).json({ msg: 'Eliminación exitosa.' });
}

export default remove;