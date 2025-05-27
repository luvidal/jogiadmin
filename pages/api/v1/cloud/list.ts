import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { execute } from '../helpers'

const s3 = new S3Client({})

async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userid = req.headers['x-userid'] as string || ''

    const command = new ListObjectsV2Command({
      Bucket: 'jogi-files',
      Prefix: `${userid}/`,
    })

    const { Contents } = await s3.send(command)

    const cloudfileids = (Contents || [])
      .map(item => item.Key?.replace(`${userid}/`, '').trim())
      .filter(Boolean)

    const ids = cloudfileids.join(',')

    await execute('_cloud.sp_delete_unused_files', { userid, ids })

    if (!ids) return res.status(200).json([])

    const results = await execute('_cloud.sp_files_metadata', { userid, ids })
    results.forEach(r => r.extension = r.filename.split('.').pop())

    res.status(200).json(results)

  } catch (error) {
    console.error('Error fetching files:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default list
