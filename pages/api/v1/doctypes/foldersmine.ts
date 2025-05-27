import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function foldersmine(req: NextApiRequest, res: NextApiResponse) {
  const userid = (req.headers['x-userid'] as string) || ''
  const rows = await execute('_hooks.sp_doctypefolders_mine', { userid })
  const all = await execute('_hooks.sp_get_doctypes_all')

  const allMap = new Map(all.map((doc: any) => [doc.doctypeid, doc]))

  rows.forEach((row: any) => {
    const ids = row.reqdocs?.split(';').filter(Boolean) || []
    row.reqdocs = ids
      .map((doctypeid:string) => allMap.get(doctypeid))
      .filter(Boolean)
  })
  return res.status(200).json(rows)
}

export default foldersmine
