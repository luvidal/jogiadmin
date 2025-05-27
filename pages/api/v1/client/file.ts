import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function file(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || ''
    const { hookid, docid } = req.query
    const fileid = req.query.fileid === 'null' || req.query.fileid === undefined ? null : req.query.fileid
    const resp = await execute('_hooks.sp_set_hookfile', { userid, hookid, docid, fileid })
    return res.status(200).json({ msg: 'ok', resp })
  }

export default file;
