import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function read(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { notificationid } = req.query;
    await execute('_users.sp_read_notification', { notificationid });
    return res.status(204).end();
}

export default read;