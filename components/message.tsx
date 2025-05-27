import { useTheme } from '@/context/theme'
import Icon from '@/components/icon'

interface Props {
    icon?: string
    text: string;
    className?: string;
  }

const Message = ({ text, icon, className = '' }:Props) => {
    const { color } = useTheme()
    return (
        <div className={`flex w-full h-full min-h-24 justify-center items-center gap-1 ${ className }`}>
            {icon && <Icon name={icon} size={16} className='text-yellow-500' />}
            <span className='text-${color}-600 text-sm'>{ text }</span>
        </div>
    )
}

export default Message;