import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { execute } from '../helpers'
import { Readable } from 'stream'

const s3 = new S3Client({})

async function view(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userid = req.headers['x-userid'] as string || ''
    const cloudfileid = req.query.cloudfileid as string

    const ids = cloudfileid
    const [{ filename, mimetype }] = await execute('_cloud.sp_files_metadata', { userid, ids })

    const command = new GetObjectCommand({
      Bucket: 'jogi-files',
      Key: `${userid}/${cloudfileid}`
    })

    const { Body, ContentType, ContentLength } = await s3.send(command)

    if (!Body || !(Body instanceof Readable)) {
      return res.status(404).json({ error: 'File not found or invalid stream' })
    }

    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(filename)}"`)
    res.setHeader('Content-Type', ContentType || mimetype || 'application/octet-stream')
    res.setHeader('Content-Length', ContentLength?.toString() || '0')

    Body.pipe(res)

  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default view
