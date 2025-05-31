import { useTheme } from '@/context/theme'
import Image from 'next/image'
import Avatar from './avatar'
import MnuBtn from './mnubtn'
import { useIsMobile } from '@/context/device'

const pages = [
  { id: 'tasks', show: true, label: 'Tareas', icon: 'ClipboardList' },
  { id: 'cloud', show: true, label: 'Nube', icon: 'Archive' },
]

const Navigation = ({ selected, setContent, onToggleMenu }: any) => {
  const { color } = useTheme()
  const mobile = useIsMobile()

  const handleClick = (id: string) => {
    setContent(id)
  }

  return (
    <div className={`flex bg-${color}-800 p-3 lg:p-8 items-center justify-between`}>

      <div className='hidden lg:flex items-center gap-2 cursor-pointer'
        onClick={() => handleClick('hooks')}>
        <Image src='/logo.png' width={38} height={38} alt='logo' />
        <Image src='/jogi.png' width={103} height={54} alt='name' />
      </div>

      <div className='flex flex-1 items-center justify-start lg:justify-end me-6 lg:me-12'>
        {pages.map(item =>
          item.show &&
            <MnuBtn key={item.id} icon={item.icon} text={item.label} selected={selected === item.id} onClick={() => handleClick(item.id)} />
        )}
      </div>

      <div className='flex flex-col items-center'>
        <Avatar size={mobile ? 36 : 45} className='cursor-pointer z-10' onClick={onToggleMenu} />
        <div className={`text-${color}-400 text-[9px] uppercase mt-1`}>
          Admin
        </div>
      </div>

    </div>
  )
}

export default Navigation

