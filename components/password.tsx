import { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Password = ({ label, className = '', classInput = '', onChange, value = '', ...rest }: any) => {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = inputRef.current?.value
      if (newValue !== undefined && newValue !== value) {
        onChange?.(newValue)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [value, onChange])

  return (
    <div className={`mb-2 ${className}`}>
      {label && <span className='text-gray-500 text-xs'>{label}</span>}
      <div className='relative'>
        <input
          {...rest}
          ref={inputRef}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`border rounded w-full h-8 px-2 pr-8 text-xs leading-tight ${classInput}`}
          autoComplete='off'
        />
        <div
          className='absolute right-2 top-1.5 cursor-pointer text-gray-500'
          onClick={() => setVisible(v => !v)}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
      </div>
    </div>
  )
}

export default Password
