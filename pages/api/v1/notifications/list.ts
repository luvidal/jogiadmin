import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function list(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    if (!userid) return res.status(200).json([])
    
    const notifications = await execute('_users.sp_get_notifications', { userid });
    return res.status(200).json(notifications);
}

export default list;