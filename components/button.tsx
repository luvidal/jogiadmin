import { useTheme } from '@/context/theme'
import { useIsMobile } from '@/context/device'
import Icon from './icon'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  text?: string;
  className?: string;
  small?: boolean;
}

const Button = ({ icon, text, className = '', small = false, ...props }: Props) => {
  const { color } = useTheme()
  const mobile = useIsMobile()
  const defaultBg = className.includes('bg-') ? '' : `bg-${color}-800`
  const paddingClass = small ? 'px-2 py-1 h-8' : 'px-4 py-2'
  const textClass = small ? 'text-xs' : 'text-base'
  const inconSize = small ? (mobile ? 11 : 15) : (mobile ? 13 : 17)

  return (
    <button
      className={`flex items-center justify-center rounded ${defaultBg} ${paddingClass} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} size={inconSize} />}
      {text && <span className={`${small ? 'ms-1' : 'ms-2'} truncate ${textClass}`}>{text}</span>}
    </button>
  )
}

export default Button
