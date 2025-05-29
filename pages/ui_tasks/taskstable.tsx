// components/TasksTable.tsx
import Icon from '@/components/icon'
import { ToolButton } from '@/components/toolbar'

const sticn: Record<string, { name: string; color: string }> = {
  success: { name: 'ThumbsUp', color: 'green' },
  pending: { name: 'Clock', color: 'gray' },
  running: { name: 'Activity', color: 'blue' },
  failed: { name: 'ThumbsDown', color: 'red' }
}

const TasksTable = ({
  tasks,
  reprocess
}: {
  tasks: any[]
  reprocess: (taskid: string) => void
}) => (
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
      {tasks?.map(t => (
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
)

export default TasksTable
