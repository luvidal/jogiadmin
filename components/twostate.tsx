
type Props<T extends string> = {
  value: T
  options: Record<T, string>
  onChange: (val: T) => void
  className?: string
}

const TwoState = <T extends string>({ value, options, onChange, className = ''}: Props<T>) => {

  const keys = Object.keys(options) as T[]
  const handleToggle = () => {
    const next = keys.find(k => k !== value)!
    onChange(next)
  }

  return (
    <div
      onClick={handleToggle}
      className={`flex h-8 rounded border border-gray-300 text-sm font-medium overflow-hidden ${className}`}
    >
      {keys.map((key, i) => {
        const active = value === key
        return (
          <div
            key={key}
            className={`flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200
              ${active ? 'bg-gray-200 text-black' : 'bg-white text-gray-500 border-l border-gray-300 first:border-l-0'}
            `}
          >
            {options[key]}
          </div>
        )
      })}
    </div>
  )
}


export default TwoState