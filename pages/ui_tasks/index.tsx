import { useEffect, useState } from 'react'
import ToolBar, { ToolButton } from '@/components/toolbar'
import Icon from '@/components/icon'
import { post, patch } from '@/utils/api'

const Tasks = () => {
  const [emailprefix, setEmailprefix] = useState('')
  const [status, setStatus] = useState('')
  const [tasks, setTasks] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const limit = 20

  useEffect(() => {
    post(`tasks`, { emailprefix, status, page, limit }).then(setTasks)
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

  const statuses = ['pending', 'running', 'success', 'failed']

  return (
    <div className='flex flex-col w-full h-full p-4 gap-4'>
      <div className='flex gap-2'>
        <input
          className='border p-2 rounded w-1/2'
          placeholder='Email ...'
          value={emailprefix}
          onChange={e => {
            setEmailprefix(e.target.value)
            setPage(0)
          }}
        />
        <select
          className={`border p-2 rounded w-1/2 ${!status ? 'text-gray-400' : 'text-black'}`}
          value={status}
          onChange={e => {
            setStatus(e.target.value)
            setPage(0)
          }}
        >
          <option value=''>Estado ...</option>
          <option value='all'>all</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='min-h-10 py-2 text-left w-[30%]'>Email</th>
            <th className='min-h-10 py-2 text-left w-[12%]'>Tarea</th>
            <th className='min-h-10 py-2 text-center w-[18%]'>Estado</th>
            <th className='min-h-10 py-2 text-center w-[5%]'>#</th>
            <th className='min-h-10 py-2 text-center w-[30%]'>Fecha</th>
            <th className='min-h-10 py-2 text-center w-[5%]'></th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((t: any) => (
            <tr key={t.taskid} className='border-b'>
              <td className='min-h-10 py-2'>{t.email}</td>
              <td className='min-h-10 py-2'>{t.script}</td>
              <td className='min-h-10 py-2'>
                <div className='flex justify-center'>
                  <Icon
                    size={18}
                    name={sticn[t.status]?.name}
                    color={sticn[t.status]?.color}
                  />
                </div>
              </td>
              <td className='min-h-10 py-2 text-center'>{t.retries}</td>
              <td className='min-h-10 py-2 text-center'>{t.date}</td>
              <td className='min-h-10 py-2 text-right'>
                <ToolButton 
                  icon='RefreshCw'
                  onClick={() => reprocess(t.taskid)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToolBar className='mt-auto ml-auto'>
        <ToolButton icon='ChevronLeft' onClick={() => setPage(p => Math.max(p - 1, 0))}/>
        <span className='flex items-center justify-center w-12 px-2 mx-1 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700'>
          {page + 1}
        </span>
        <ToolButton
          icon='ChevronRight'
          onClick={() => setPage(p => p + 1)}
          disabled={tasks?.length < limit}
        />
      </ToolBar>
    </div>
  )
}

export default Tasks

const sticn: Record<string, { name: string; color: string; }> = {
  success: { name: 'ThumbsUp', color: 'green' },
  pending: { name: 'Clock', color: 'gray' },
  running: { name: 'Activity', color: 'blue' },
  failed: { name: 'ThumbsDown', color: 'red' }
}
