import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function create(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const [{ folderid, label }] = await execute('_hooks.sp_create_doctypefolder', { userid });
    return res.status(200).json({ folderid, label });
}

export default create;
