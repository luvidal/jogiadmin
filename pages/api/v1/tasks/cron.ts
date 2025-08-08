import { NextRequest, NextResponse } from 'next/server'
import { execute, uploadS3 } from '../_helpers'

export default async function handler(req: NextRequest) {
  const [taskRef] = await execute('_docbroker.sp_run_task')
  if (!taskRef) return NextResponse.json({ status: 'no-task' }, { status: 204 })

  const taskid = taskRef.taskid
  const [task] = await execute('_docbroker.sp_get_task', { taskid })
  if (!task) return NextResponse.json({ status: 'not-found' }, { status: 204 })

  const { userid, doctypeid, script, retries, context, filename } = task
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

    const raw = await r.text()
    let parsed: any = {}
    try { parsed = JSON.parse(raw) } catch { }

    const { data, success, message, error } = parsed
    const failText = error || message || raw

    if (!r.ok || success === false || !data) {
      await execute('_docbroker.sp_update_task_status', {
        taskid, success: 0, retries, returntext: failText.slice(0, 500),
      })
      return NextResponse.json({ status: 'fail', error: failText }, { status: 500 })
    }

    await uploadS3(userid, doctypeid, filename, data)
    await execute('_docbroker.sp_update_task_status', {
      taskid, success: 1, retries: 0, returntext: `Uploaded ${filename}`,
    })

    return NextResponse.json({ status: 'ok', filename })
  } catch (err: any) {
    const msg = err?.message || String(err)
    await execute('_docbroker.sp_update_task_status', {
      taskid, success: 0, retries, returntext: msg.slice(0, 500),
    })
    return NextResponse.json({ status: 'error', error: msg }, { status: 500 })
  }
}
