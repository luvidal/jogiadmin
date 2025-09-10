import { NextApiRequest, NextApiResponse } from 'next'
import { execute, uploadS3 } from '../_helpers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { taskid, userid, filename, buffer, doctypeid } = req.body
  const cloudid = await uploadS3(userid, doctypeid, filename, buffer)
  await execute('_tasks.sp_update_task_status', { taskid, success: 1, retries: 4 })
  return res.status(200).json({ msg: 'File uploaded successfully', cloudid, userid })
}
