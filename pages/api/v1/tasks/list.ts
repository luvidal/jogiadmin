import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function list(req: NextApiRequest, res: NextApiResponse) {
  let { emailprefix = null, status = 'not-success', page = 0, limit = 13 } = req.body
  const offset = parseInt(page) * parseInt(limit)
  if (!status) status = 'not-success'
  console.log('status', status)
  const rows = await execute('_docbroker.sp_get_tasks', { emailprefix, status, offset, limit })
  res.status(200).json(rows)
}


export default list
