import FileIcon from './fileicon'
import Icon from './icon'
import { useIsMobile } from '@/context/device'

const CloudFile = ({ label, description, icon, method }: any) => {

  const mobile = useIsMobile()

  const badge = method === 'manual' ? 'User' : method === 'automatic' ? 'Star' : 'Ellipsis'
  const color = method === 'manual' ? 'bg-red-700' : method === 'automatic' ? 'bg-green-700' : 'bg-gray-400'

  return (
    <div className='flex items-center gap-[12px] sm:gap-4'>
      <div className='relative w-6 h-6 -mt-1'>
        <FileIcon ext={icon} />
        <div className={`absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-4 h-4 rounded-full ${color} flex items-center justify-center`}>
          <Icon
            name={badge}
            size={mobile ? 9 : 10}
            stroke='white'
            strokeWidth={4}
          />
        </div>
      </div>
      <div className='w-[180px] sm:w-[220px] overflow-hidden whitespace-nowrap'>
        <div className='truncate font-medium text-[clamp(0.75rem,1.1vw,0.875rem)] text-gray-800'>
          {label || '-'}
        </div>
        <div className='truncate text-[clamp(0.72rem,1vw,0.8rem)] text-gray-400'>
          {description}
        </div>
      </div>
    </div>
  )
}

export default CloudFile
