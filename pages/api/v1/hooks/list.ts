import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function list(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const allowEmpty = req.query.allowempty ? 1 : 0;
    const rows = await execute('_hooks.sp_get_hooks', { userid, allowEmpty });
    return res.status(200).json(rows);
}

export default list;
