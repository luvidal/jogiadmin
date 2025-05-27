import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { execute } from '../helpers'

const s3 = new S3Client({})

async function upload(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || ''
  let { filename, buffer, mimetype, doctypeid, size, lastmodified } = req.body

  lastmodified = new Date(lastmodified).toISOString()
  size = Number(size)
  const sizekb = Math.ceil(size / 1024) + ' KB'
  const uploadmethod = 'manual'

  const values = { userid, uploadmethod, filename, mimetype, doctypeid, lastmodified, size, sizekb }
  const [{ cloudfileid }] = await execute('_cloud.sp_create_file', values)

  await s3.send(new PutObjectCommand({
    Bucket: 'jogi-files',
    Key: `${userid}/${cloudfileid}`,
    Body: Buffer.from(buffer, 'base64'),
    ContentType: mimetype
  }))

  return res.status(200).json({ msg: 'File uploaded successfully' })
}

export default upload
