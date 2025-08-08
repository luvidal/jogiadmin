import { useEffect, useState } from 'react'
import ToolBar, { ToolButton } from '@/components/toolbar'
import TasksTable from './taskstable'
import Filter from './filter'
import Manual from './manual'
import Pager from '../../components/pager'
import { post, patch } from '@/utils/api'

const Tasks = () => {
  const [emailprefix, setEmailprefix] = useState('')
  const [status, setStatus] = useState('')
  const [tasks, setTasks] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [manualTask, setManualTask] = useState<any | null>(null)
  const limit = 13

  useEffect(() => {
    post(`tasks`, { emailprefix, status, page, limit }).then(setTasks)
  }, [emailprefix, status, page])

  useEffect(() => {
    const needsRefresh = tasks.some(t => t.status !== 'success' && t.status !== 'failed')
    if (!needsRefresh) return

    const interval = setInterval(() => {
      post(`tasks`, { emailprefix, status, page, limit }).then(setTasks)
    }, 3000)

    return () => clearInterval(interval)
  }, [tasks, emailprefix, status, page])

  const reprocess = async (taskid: string) => {
    setTasks(tasks.map(t => t.taskid === taskid ? { ...t, status: 'pending' } : t))
    await patch(`tasks/${taskid}/reprocess`)
  }

  const manual = async (taskid: string) => {
    const task = tasks.find(t => t.taskid === taskid)
    if (!task) return
    setManualTask(task)
  }

  return (
    <div className='flex flex-col w-full h-full p-4 gap-4'>
      <Filter
        emailprefix={emailprefix}
        setEmailprefix={setEmailprefix}
        status={status}
        setStatus={setStatus}
        setPage={setPage}
      />
      <TasksTable tasks={tasks} reprocess={reprocess} manual={manual} />
      <Pager page={page} setPage={setPage} hasNext={tasks.length >= limit} />
      {manualTask && <Manual task={manualTask} onClose={() => setManualTask(null)} />}
    </div>
  )
}

export default Tasks
