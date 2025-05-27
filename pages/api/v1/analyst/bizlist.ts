import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function bizlist(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const rows = await execute('_analysts.sp_list_businesses');
    return res.status(200).json(rows);
}

export default bizlist;