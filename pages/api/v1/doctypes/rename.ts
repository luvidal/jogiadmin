import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function rename(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { folderid } = req.query;
    const { label } = req.body;
    const result =  await execute('_hooks.sp_set_doctypefolder_name', { folderid, userid, label });
    return res.status(200).json(result);
}

export default rename;
