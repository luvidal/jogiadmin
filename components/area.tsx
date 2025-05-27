import { useState, useEffect } from 'react'

interface Props {
  label?: string
  rows?: number
  className?: string
  readOnly?: boolean
  onChange?: (value: string) => void
  value?: string
}

type TextareaProps = Props & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value' | 'readOnly'>

const Area = ({ label, rows = 3, className = '', readOnly, onChange, value = '', ...rest }: TextareaProps) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleBlur = () => {
    if (localValue !== value) onChange?.(localValue)
  }

  return (
    <div className={`mb-2 ${className}`}>
      {label && <span className='text-gray-500 text-xs'>{label}</span>}
      <textarea
        {...rest}
        rows={rows}
        readOnly={readOnly}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className='border rounded p-2 w-full resize-none'
        style={{ height: `${rows * 1.5}rem` }}

      />
    </div>
  )
}

export default Area
