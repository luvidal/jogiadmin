import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

export default async function docs(req: NextApiRequest, res: NextApiResponse) {
  const { hookid } = req.query
  const raw = await execute('_clients.sp_get_hook_docs', { hookid })
  const grouped = new Map<string, any>()

  for (const doc of raw) {
    let group = grouped.get(doc.id)
    if (!group) {
      group = {
        id: doc.id,
        label: doc.label,
        sources: doc.sources,
        selected: doc.selected,
        files: [],
      }
      grouped.set(doc.id, group)
    }

    if (!doc.cloudfileid) continue

    group.files.push({
      id: doc.cloudfileid,
      name: doc.filename,
      ext: doc.filename.split('.').pop(),
      size: doc.sizekb,
      date: doc.date,
      method: doc.uploadmethod,
    })
  }

  const docs = Array.from(grouped.values())

  docs.forEach(d => {
    d.files.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  return res.status(200).json(docs)
}

