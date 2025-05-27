import { useTheme } from '@/context/theme'
import Icon from '@/components/icon'
import { useIsMobile } from '@/context/device'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  text: string
  className?: string
  selected?: boolean
}

const MnuBtn = ({ icon, text, className, selected, ...props }: Props) => {
  const { color } = useTheme()
  const mobile = useIsMobile()

  const base = 'border ms-1 sm:ms-2 w-[clamp(60px,20vw,180px)] px-[clamp(0.5rem,1vw,1rem)] py-[clamp(0.25rem,0.8vw,0.75rem)]'

  const selectedClass = selected
    ? `border-${color}-900 bg-${color}-100 text-white`
    : `border-${color}-700 bg-transparent text-${color}-400`

  return (
    <button
      className={`flex items-center rounded bg-${color}-900 ${base} ${selectedClass} ${className || ''}`}
      {...props}
    >
      <Icon name={icon} size={mobile ? 20 : 16} />
      <span className='ms-2 hidden sm:inline transition-all duration-300 text-[clamp(0.8rem,1.2vw,1rem)] whitespace-nowrap'>{text}</span>
    </button>
  )
}

export default MnuBtn
