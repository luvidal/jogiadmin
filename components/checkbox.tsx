interface Props {
  label: string;
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
}
  
const Checkbox = ({ label, checked, className = '', onChange }: Props) => (
  <label className={`flex items-center mb-2 cursor-pointer ${className}`}>
    <input
      type='checkbox'
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className='mr-2'
    />
    <span className='text-sm'>{label}</span>
  </label>
);
  
export default Checkbox;