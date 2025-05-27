import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function keys(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const [{ rut, claveunica, documento }] = await execute('_users.sp_get_user', { userid });
    return res.status(200).json({ rut, claveunica, documento });
}

export default keys;