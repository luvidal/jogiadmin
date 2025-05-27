import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function bizmine(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || '';
  const rows = await execute('_analysts.sp_get_businesses', { userid });
  const businesses = rows[0]?.businessids;

  const ids = typeof businesses === 'string'
    ? businesses.split(',').map(id => parseInt(id.trim()))
    : [];

  return res.status(200).json(ids);
}

export default bizmine;
