import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { execute } from '../helpers'
import archiver from 'archiver'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}

const s3 = new S3Client({})

async function downloadhook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hookid = req.query.hookid as string
    if (!hookid) return res.status(400).json({ error: 'Hook ID is required' })

    const [{ labelanalyst }] = await execute('_analysts.sp_get_hook_info', { hookid })

    const rows = await execute('_analysts.sp_hook_metadata', { hookid })
    if (!rows?.length) return res.status(404).json({ error: 'No files found' })

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="${labelanalyst}.zip"`)

    const archive = archiver('zip', { zlib: { level: 9 } })

    archive.on('error', err => {
      console.error('Archive error:', err)
      res.status(500).end()
    })

    archive.pipe(res)

    for (const { fileid, filename } of rows) {
      const { Body } = await s3.send(new GetObjectCommand({
        Bucket: 'jogi-hooks',
        Key: `${hookid}/${fileid}`
      }))

      if (Body) archive.append(Body as any, { name: filename || `${fileid}.bin` })
    }

    await archive.finalize()
  } catch (error) {
    console.error('Download error:', error)
    if (!res.headersSent) res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default downloadhook
