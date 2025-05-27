import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function folderset(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { folderid } = req.query;
    const { reqdocs } = req.body;
    const result =  await execute('_hooks.sp_set_doctypefolder_reqs', { folderid, userid, reqdocs });
    return res.status(200).json(result);
}

export default folderset;
