import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function rename(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { cloudfileid } = req.query;
    const { filename } = req.body;

    await execute('_cloud.sp_set_filename', { cloudfileid, filename, userid });

    return res.status(200).json({ msg: 'ok'});
}

export default rename;
