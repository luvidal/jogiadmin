import { useTheme } from '@/context/theme'

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  onChange: (value: string) => void;
}

const Select = ({ label, value, placeholder, options, className = '', onChange }: Props) => {
  const { color } = useTheme()
  return (
    <div className={`mb-2 ${className}`}>
      <label className='text-${color}-500 text-xs'>{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded p-2 w-full ${value ? 'text-black' : 'text-${color}-400'}`}
      >
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {options?.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
