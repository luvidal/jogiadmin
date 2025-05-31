import { useState } from 'react'
import { useAccess } from '@/context/access'
import Overlay from '@/components/overlay'
import Navigation from './main/navigation'
import Content from './main/content'
import UserMenu from './main/usermenu'
import Login from './login'

const Index = () => {
  const { access } = useAccess()
  const [usermenu, setUserMenu] = useState(false)
  const [content, setContent] = useState('tasks')
  const [refreshKey, setRefreshKey] = useState(0)

  if (!access) return <Login />

  return (
    <div className='flex flex-col w-screen h-screen'>
      <Navigation
        selected={content}
        setContent={(id:any) => {
          setContent(id)
          setRefreshKey(k => k + 1)
        }}
        onToggleMenu={() => setUserMenu(v => !v)}
      />

      {usermenu && (
        <>
          <Overlay onClick={() => setUserMenu(false)} />
          <UserMenu onSelect={id => {
            setContent(id)
            setUserMenu(false)
          }} />
        </>
      )}

      <Content
        key={refreshKey}
        selected={content}
      />
    </div>
  )
}

export default Index
