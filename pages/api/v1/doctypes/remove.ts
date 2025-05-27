import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function remove(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { folderid } = req.query;
    const result =  await execute('_hooks.sp_del_doctypefolder', { folderid, userid });
    return res.status(200).json(result);
}

export default remove;
