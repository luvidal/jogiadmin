import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function info(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const [user] = await execute('_users.sp_get_user', { userid });
    return res.status(200).json(user);
}

export default info;