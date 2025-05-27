import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function rename(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { hookid } = req.query;
    const { label, role } = req.body;
    const result = await execute(`_${role}s.sp_set_hook_name`, { hookid, label });
    return res.status(200).json(result);
}

export default rename;
