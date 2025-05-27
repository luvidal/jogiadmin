import { useState, useEffect } from 'react'

interface Props {
  label?: string
  readOnly?: boolean
  onChange?: (value: string) => void
  value?: string
  className?: string
  classInput?: string
}

type InputProps = Props & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'readOnly'>

const Input = ({ label, className = '', classInput = '', readOnly, onChange, value = '', ...rest }: InputProps) => {
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
      <input
        {...rest}
        readOnly={readOnly}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className={`border rounded p-2 w-full ${classInput}`}
      />
    </div>
  )
}

export default Input
