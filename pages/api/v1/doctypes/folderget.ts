import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function folderget(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { folderid } = req.query;
    const raw = await execute('_hooks.sp_get_doctypefolder', { folderid });
    const all = await execute('_hooks.sp_get_doctypes_all');
    const ids = raw?.[0]?.reqdocs?.split(';') ?? [];
    const doctypes = all.filter((d: any) => ids.includes(d.doctypeid));
    return res.status(200).json(doctypes);
}

export default folderget;
