import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../../_helpers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { taskid } = req.query
    await execute('_tasks.sp_reprocess_task', { taskid })
    res.status(200).json({ msg: 'ok' })
}

