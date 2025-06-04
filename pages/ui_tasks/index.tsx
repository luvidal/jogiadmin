import { useEffect, useState } from 'react'
import ToolBar, { ToolButton } from '@/components/toolbar'
import TasksTable from './taskstable'
import Filter from './filter'
import Manual from './manual'
import { post, patch } from '@/utils/api'

const Tasks = () => {
  const [emailprefix, setEmailprefix] = useState('')
  const [status, setStatus] = useState('')
  const [tasks, setTasks] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [manualTask, setManualTask] = useState<any | null>(null)
  const limit = 13

  useEffect(() => {
    post('tasks', { emailprefix, status, page, limit }).then(setTasks)
  }, [emailprefix, status, page])

  useEffect(() => {
    const needsRefresh = tasks.some(t => t.status !== 'success' && t.status !== 'failed')
    if (!needsRefresh) return

    const interval = setInterval(() => {
      post('tasks', { emailprefix, status, page, limit }).then(setTasks)
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
      <TasksTable tasks={tasks} reprocess={reprocess} manual={manual}/>
      <ToolBar className='mt-auto ml-auto'>
        <ToolButton icon='ChevronLeft' label='Más' onClick={() => setPage(p => Math.max(p - 1, 0))} />
        <span className='flex items-center justify-center w-12 px-2 mx-1 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700'>
          {page + 1}
        </span>
        <ToolButton
          icon='ChevronRight'
          label='Menos'
          onClick={() => setPage(p => p + 1)}
          disabled={tasks?.length < limit}
        />
      </ToolBar>
      {manualTask && <Manual task={manualTask} onClose={() => setManualTask(null)}/>}
    </div>
  )
}

export default Tasks
