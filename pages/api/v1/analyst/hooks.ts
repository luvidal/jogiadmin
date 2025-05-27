import { NextApiRequest, NextApiResponse } from 'next';
import { execute } from '../helpers';

async function hooks(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    try {
        const rows = await execute('_analysts.sp_get_hooks', { analystId: userid });
        return res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

export default hooks;
