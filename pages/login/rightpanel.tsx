import { useTheme } from '@/context/theme'

const RightPanel = () => {
  const { color } = useTheme()
  
  return (
    <div className='relative h-full w-full'>
      <div className={`absolute inset-0 bg-${color}-600 bg-opacity-20`} />
    </div>
  )
}

export default RightPanel;
