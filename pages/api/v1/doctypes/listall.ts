import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function listall(req: NextApiRequest, res: NextApiResponse) {
    const doctypes =  await execute('_hooks.sp_get_doctypes_all');
    return res.status(200).json(doctypes);
}

export default listall;
