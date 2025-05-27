import { useTheme } from '@/context/theme'

type TabsProps<T extends string> = {
    value: T;
    options: T[];
    labels: string[];
    onChange: (value: T) => void;
    className?: string;
  };
  
const Tabs = <T extends string>({value, options, labels, onChange, className = ''}: TabsProps<T>) => {
  const { color } = useTheme()
  return (
  <div className={`flex border-b border-${color}-300 ${className}`}>
    {options?.map((opt, i) => (
      <div
        key={opt}
        onClick={() => onChange(opt)}
        className={`flex flex-1 items-center justify-center text-sm cursor-pointer transition-all px-4 py-2
          ${value === opt
            ? 'border-x border-t border-${color}-300 border-b-0 bg-white -mb-px text-${color}-950 font-medium'
            : 'text-${color}-400 hover:text-${color}-700'
          }`}
      >
        {labels[i]}
      </div>
    ))}
  </div>
  );
}

export default Tabs;
  