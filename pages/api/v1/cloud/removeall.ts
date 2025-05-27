import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { execute } from '../helpers'

const s3 = new S3Client({})

async function removeall(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || ''

  const listCommand = new ListObjectsV2Command({
    Bucket: 'jogi-files',
    Prefix: `${userid}/`,
  })
  const listed = await s3.send(listCommand)

  if (!listed.Contents?.length) {
    return res.status(200).json({ msg: 'No files to delete' })
  }

  const objects = listed.Contents.map(obj => ({ Key: obj.Key! }))

  const deleteCommand = new DeleteObjectsCommand({
    Bucket: 'jogi-files',
    Delete: { Objects: objects },
  })
  await s3.send(deleteCommand)

  await execute('_cloud.sp_delete_all', { userid })

  return res.status(200).json({ msg: 'All files deleted successfully' })
}

export default removeall
