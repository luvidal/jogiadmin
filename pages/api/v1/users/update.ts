import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function update(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const user = await execute('_users.sp_update_user', { userid, ...req.body });
    return res.status(200).json({ msg: 'ok', user });
}

export default update;
