import { NextApiRequest, NextApiResponse } from 'next';
import { execute, stripHtml, clean } from '../helpers';

async function reject(req: NextApiRequest, res: NextApiResponse) {
    const { hookid } = req.query;
    const { content } = req.body;
    
    try {
        const [{ userid, labelclient }]  = await execute('_analysts.sp_get_hook_info', { hookid });
        await execute('_analysts.sp_reject_hook', { hookid });

        const title = labelclient
        const message = stripHtml(clean(content || ''))
        await execute('_users.sp_add_notification', { userid, title, message });

        return res.status(200).json({ msg:'ok' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

export default reject;


