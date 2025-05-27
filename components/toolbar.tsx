import { ReactNode } from 'react'
import Icon from '@/components/icon'

type ToolBarProps = {
  children?: ReactNode;
  className?: string;
};

const ToolBar = ({ children, className }: ToolBarProps) => (
  <div className={`flex ${className || ''}`}>
    {children}
  </div>
);

export default ToolBar;

type ToolButtonProps = {
  icon: string
  label?: string
  visible?: boolean
  invert?: boolean
  disabled?: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const ToolButton = ({
  icon,
  label,
  visible = true,
  invert = false,
  disabled = false,
  onClick,
  ...rest
}: ToolButtonProps) => {
  const base = 'flex h-[30px] items-center justify-center border rounded whitespace-nowrap px-2 -ml-px first:ml-0'
  const colors = invert
    ? 'bg-gray-600 text-white border-gray-600 hover:bg-gray-500 disabled:text-gray-400 disabled:bg-gray-600 disabled:hover:bg-gray-600'
    : 'bg-transparent text-gray-950 border-gray-300 hover:bg-gray-200 disabled:text-gray-400 disabled:bg-transparent disabled:hover:bg-transparent'

  const width = label ? 'w-[30px] sm:w-[100px]' : 'w-[30px]'

  return visible ? (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`${base} ${colors} ${width}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={11} />}
      {label && <span className='hidden sm:inline text-xs ms-1 truncate'>{label}</span>}
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