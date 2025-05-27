import Icon from './icon'
import { useIsMobile } from '@/context/device'

const iconMap: Record<string, string> = {
  pdf: 'FileText',
  doc: 'FileText',
  docx: 'FileText',
  png: 'FileImage',
  jpg: 'FileImage',
  jpeg: 'FileImage',
  zip: 'FileArchive',
  default: 'File',
}

const FileIcon = ({ ext, size }: { ext: string; size?: number }) => {
  const mobile = useIsMobile()
  const name = iconMap[ext?.toLowerCase?.()] || iconMap.default
  const finalSize = size ?? (mobile ? 25 : 28)

  return <Icon name={name} size={finalSize} color='black' />
}

export default FileIcon
