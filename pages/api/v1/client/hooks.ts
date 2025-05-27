import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function hooks(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const rows = await execute('_clients.sp_get_hooks', { clientId: userid });
    return res.status(200).json(rows);
}

export default hooks;
