import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function list(req: NextApiRequest, res: NextApiResponse) {
    const { emailprefix = null, status = null, page = 0, limit = 20 } = req.body
    const offset = parseInt(page) * parseInt(limit)
    const rows = await execute('_docbroker.sp_get_tasks', { emailprefix, status, offset, limit })
    res.status(200).json(rows)
}

export default list
