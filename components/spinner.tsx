import { useTheme } from '@/context/theme'
import Icon from './icon'

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  const { color } = useTheme()
  return (
    <div className={`flex justify-center items-center w-full h-full min-h-24 ${className}`}>
      <Icon name='LoaderCircle' className={`text-${color}-800 w-6 h-6 animate-spin`}/>
    </div>
  )
}

export default Spinner
