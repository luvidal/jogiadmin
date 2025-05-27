import { LucideProps, icons } from 'lucide-react'

interface Props extends LucideProps {
  name?: string
}

const Icon = ({ name, ...props }: Props) => {
  const fallback = icons.CircleHelp
  const LucideIcon = name && icons[name as keyof typeof icons] || fallback

  return <LucideIcon {...props} />
}

export default Icon
