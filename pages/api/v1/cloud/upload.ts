import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { execute } from '../helpers'

const s3 = new S3Client({})

async function upload(req: NextApiRequest, res: NextApiResponse) {
  let { taskid, userid, filename, buffer, mimetype, doctypeid, size, lastmodified } = req.body

  lastmodified = new Date(lastmodified).toISOString()
  size = Number(size)
  const sizekb = Math.ceil(size / 1024) + ' KB'
  const uploadmethod = 'automatic'

  const values = { userid, uploadmethod, filename, mimetype, doctypeid, lastmodified, size, sizekb }
  const [{ cloudfileid }] = await execute('_cloud.sp_create_file', values)

console.log('typeof buffer:', typeof buffer)
console.log('is string:', typeof buffer === 'string')
console.log('startsWith data:', typeof buffer === 'string' && buffer.slice(0, 20))


  await s3.send(new PutObjectCommand({
    Bucket: 'jogi-files',
    Key: `${userid}/${cloudfileid}`,
    Body: Buffer.from(buffer, 'base64'),
    ContentType: mimetype
  }))

  await execute(`_docbroker.sp_update_task_status`, {
    taskid,
    success: 1,
    retries: 4,
  })

  return res.status(200).json({ msg: 'File uploaded successfully' })
}

export default upload
