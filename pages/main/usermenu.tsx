import Icon from '@/components/icon'
import Anchor from '@/components/anchor'
import { useRole } from '@/context/role'
import { useAccess } from '@/context/access'

interface Props {
  onSelect: (target: string) => void
}

const UserMenu = ({ onSelect }: Props) => {
  const { isAnalyst } = useRole()
  const { setAccess } = useAccess()

  const items = [
    { label: 'Cerrar Sesión', icon: 'LogOut', action: 'logout' },
  ]

  return (
    <div className='fixed top-[calc(100px)] right-8 z-50 bg-white p-4 py-8 border border-gray-200 rounded shadow-lg'>
      <div className='w-[200px] space-y-6'>
        {items?.map((x, i) =>
          <Anchor key={i} onClick={() => setAccess(false)} className='flex items-center space-x-2 hover:text-gray-500'>
            <Icon name={x.icon || ''} size={15} />
            <span>{x.label}</span>
          </Anchor>
        )}
      </div>
    </div>
  )
}

export default UserMenu
