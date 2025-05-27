import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function bizset(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || '';
  const { ids } = req.body;
  const businesses = Array.isArray(ids) ? ids.join(',') : '';

  const rows = await execute('_analysts.sp_set_businesses', { userid, businesses });
  return res.status(200).json(rows);
}

export default bizset;
