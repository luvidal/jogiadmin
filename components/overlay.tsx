import { useTheme } from '@/context/theme'

const Overlay = ({ onClick }: { onClick: () => void }) => {
  const { color } = useTheme()
  return (
    <div
      className={`fixed inset-0 bg-${color}-950 opacity-50 z-20`}
      onClick={onClick}
    />
  )
}

export default Overlay