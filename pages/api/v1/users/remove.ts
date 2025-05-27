import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function remove(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    await execute('_users.sp_delete_user', { userid });
    return res.status(204).json({ msg: 'Eliminación exitosa.' });
}

export default remove;