import { useTheme } from '@/context/theme'
import Icon from '@/components/icon'
import { useIsMobile } from '@/context/device'

interface Props {
  title?: string
  children?: React.ReactNode
  onClose: () => void
  className?: string
}

const Modal = ({ title, children, onClose, className = '' }: Props) => {
  const { color } = useTheme()
  const mobile = useIsMobile()

  return (
    <div
      className='fixed z-[9999] inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300'
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col bg-white shadow-lg ${mobile ? 'w-full h-full rounded-none' : 'w-[720px] h-[720px]'}`}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className={`flex justify-between bg-${color}-600 text-white p-3`}>
          <div className='flex items-center'>
            <Icon name='AppWindow' size={18} className='me-2' />
            <span>{title ?? ' '}</span>
          </div>
          <Icon name='X' size={18} className='cursor-pointer' onClick={onClose} />
        </div>

        <div className={`flex-1 overflow-auto ${className}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
