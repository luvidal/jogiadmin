import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../helpers'

async function list(req: NextApiRequest, res: NextApiResponse) {
    const userid = req.headers['x-userid'] as string || '';
    const { doctypeid } = req.query;
    const [{ instructions }] =  await execute('_hooks.sp_get_docinstructions', { doctypeid });
    return res.status(200).json(instructions);
}

export default list;
