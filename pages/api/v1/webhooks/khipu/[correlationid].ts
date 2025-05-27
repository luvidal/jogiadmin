import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../../helpers'

async function khipu(req: NextApiRequest, res: NextApiResponse) {
  const { correlationid } = req.query
  await execute('_docbroker.sp_save_khipu', { correlationid, json:req.body })
  return res.status(200).json({ msg:'ok', json:req.body })
}

export default khipu;
