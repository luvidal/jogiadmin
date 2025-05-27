import { useTheme } from '@/context/theme'
import RightPanel from './rightpanel'
import LeftPanel from './leftpanel'

const Login = () => {
  const { color } = useTheme()
  return (
    <div className='flex h-screen w-screen'>
      <div className={`flex-1 bg-${color}-800 flex flex-col items-center`}>
        <LeftPanel/>
      </div>
      <div className='hidden lg:block w-[60%]'>
        <RightPanel/>
      </div>
    </div>
  )
};

export default Login
