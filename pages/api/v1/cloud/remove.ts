import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { execute } from '../helpers'

const s3 = new S3Client({})

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || ''
  const { cloudfileid } = req.query

  await execute('_cloud.sp_delete_file', { cloudfileid, userid })

  await s3.send(new DeleteObjectCommand({
    Bucket: 'jogi-files',
    Key: `${userid}/${cloudfileid}`,
  }))

  return res.status(200).json({ msg: 'File deleted successfully' })
}

export default remove
