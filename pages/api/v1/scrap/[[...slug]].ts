import { NextApiRequest, NextApiResponse } from 'next'
import { execute, uploadS3 } from '../helpers'
import createHandler from '@/utils/handler'

export default createHandler([
    { name: 'scrap/[taskid]', method: 'GET', authRequired: true, handler }
])

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { taskid } = req.query
    const [{ userid, doctypeid, filename, context, retries, script }] = await execute('_docbroker.sp_get_task', { taskid })
    const keys = JSON.parse(context)

    try {
        const r = await fetch(`https://scraper.jogi.cl/${script}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Internal-Key': process.env.INTERNAL_API_KEY || '',
            },
            body: JSON.stringify(keys),
        })

        const text = await r.text()
        let parsed: any = {}
        try {
            parsed = JSON.parse(text)
        } catch { }

        const { data, success, message, error } = parsed
        const failureText = error || message || text

        if (!r.ok || success === false || !data) {
            await execute('_docbroker.sp_update_task_status', {
                taskid,
                success: 0,
                retries,
                returntext: failureText.slice(0, 500),
            })
            return res.status(502).json({ success: false, message: 'Error from scraper', error: failureText })
        }

        await uploadS3(userid, doctypeid, filename, data)
        await execute('_docbroker.sp_update_task_status', {
            taskid,
            success: 1,
            retries: 0,
            returntext: `Certificate ${script} uploaded`,
        })

        res.status(200).json({ success: true, message: 'OK' })

    } catch (err: any) {
        const fallback = String(err?.message || err)
        await execute('_docbroker.sp_update_task_status', {
            taskid,
            success: 0,
            retries,
            returntext: fallback.slice(0, 500),
        })

        res.status(500).json({ success: false, message: 'Internal error', error: fallback })
    }
}
