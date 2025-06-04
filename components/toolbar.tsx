import { ReactNode } from 'react'
import Icon from '@/components/icon'

type ToolBarProps = {
  children?: ReactNode;
  className?: string;
};

const ToolBar = ({ children, className }: ToolBarProps) => (
  <div
    className={`flex ${className || ''}`}
    onClick={e => e.stopPropagation()}
  >
    {children}
  </div>
)

export default ToolBar;

type ToolButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string
  label: string
  onClick: () => void
  visible?: boolean
  invert?: boolean
}

export const ToolButton = ({
  icon,
  label,
  visible = true,
  onClick,
  invert = false,
  ...rest
}: ToolButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const base = 'flex w-[32px] h-[32px] items-center justify-center border rounded px-2 -ml-px first:ml-0'
  const colors = invert
    ? 'bg-gray-600    text-white    border-gray-950 hover:bg-gray-500'
    : 'bg-transparent text-gray-600 border-gray-300 hover:bg-gray-200'

  return visible ? (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`${base} ${colors} ${rest.className ?? ''}`}
      {...rest}
    >
      <Icon name={icon} size={18} />
    </button>
  ) : null
}


interface ToolSelectProps {
  value: string | null
  options: { label: string; value: string }[]
  onChange: (value: string | null) => void
  visible?: boolean
}

export const ToolSelect = ({ value, options, visible = true, onChange }: ToolSelectProps) => {
  return ( visible &&
    <div className={`flex w-[94px] sm:w-[100px] h-[34px] border border-gray-300 rounded text-gray-950 -ml-px first:ml-0`}>
      {options.length > 0 ? (
        <select
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value || null)}
          className='w-full h-full bg-transparent px-[5px] sm:px-2 text-[11px] sm:text-xs outline-none cursor-pointer border-none'
        >
          <option value=''></option>
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  )
}

export const ToolGap = () => <div className='w-1 sm:w-4 flex-shrink-0'/>

export const ToolGroup = ({ children }: { children: ReactNode }) => (
  <>
    <ToolGap/>
    {children}
  </>
)