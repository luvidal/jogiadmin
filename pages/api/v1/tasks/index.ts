import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../_helpers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { emailprefix = null, status = 'not-success', page = 0, limit = 13 } = req.body
  const offset = parseInt(page) * parseInt(limit)
  if (!status) status = 'not-success'
  const rows = await execute('_tasks.sp_get_tasks', { emailprefix, status, offset, limit })
  res.status(200).json(rows)
}

