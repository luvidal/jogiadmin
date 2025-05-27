import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function reprocess(req: NextApiRequest, res: NextApiResponse) {
    const { taskid } = req.query
    await execute('_docbroker.sp_reprocess_task', { taskid })
    res.status(200).json({ msg: 'ok'})
}

export default reprocess
