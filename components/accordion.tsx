import { useIsMobile } from '@/context/device'
import Icon from '@/components/icon'
import Spinner from '@/components/spinner'

interface Props {
  label: string
  sublabel?: string
  icon: string
  iconOpened?: string
  subicon?: string
  children?: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  loading?: boolean
  className?: string
  tbar?: React.ReactNode
}

const Accordion = ({ label, sublabel, icon, iconOpened, subicon, children, isOpen = false, onToggle, loading, className, tbar }: Props) => {
  const mobile = useIsMobile()

  return (
    <div className='border-b border-gray-100'>
      <div
        className={`flex justify-between items-center bg-gray-50 cursor-pointer border-b border-gray-100 ${className || ''} px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.5rem,1.5vw,1rem)]`}
        onClick={onToggle}
      >
        <div className='flex w-full items-center gap-[clamp(0.3rem,1vw,2rem)]'>

          <div className='flex flex-col justify-center items-center'>
            <Icon
              name={isOpen && iconOpened ? iconOpened : icon}
              size={mobile ? 24 : 28}
            />
            {subicon && <div className='-mt-[2px] text-[clamp(0.45rem,1vw,0.6rem)] tracking-[-0.1em]'>{ subicon }</div>}
          </div>

          <div className='flex flex-col w-[90%]'>
            <span className='truncate overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.85rem,1.2vw,1.05rem)] font-medium leading-tight'>
              {label}
            </span>
            {sublabel && (
              <span className='truncate overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.65rem,1vw,0.875rem)] text-gray-400'>
                {sublabel}
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center gap-[clamp(0.25rem,1vw,0.5rem)]'>
          {isOpen && tbar && <span className='me-2'>{tbar}</span>}
          <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={mobile ? 14 : 16} />
        </div>
      </div>

      <div
        className='overflow-hidden transition-all duration-700 ease-in-out'
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      >
        {loading ? <Spinner /> : children}
      </div>
    </div>
  )
}

export default Accordion
