import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function docs(req: NextApiRequest, res: NextApiResponse) {
    const { hookid } = req.query
    try {
        const rows = await execute('_analysts.sp_get_hook_docs', { hookid });
        return res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

export default docs;
