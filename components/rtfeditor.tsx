import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '@/context/theme'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface RTFEditorProps {
    label?: string;
    value: string;
    onChange: (content: string) => void;
    className?: string;
}

const RTFEditor = ({ value, label, onChange, className = '' }: RTFEditorProps) => {
  const { color } = useTheme()
  return (
    <div className={className}>
      {label && <span className='text-${color}-500 text-xs mb-3'>{label}</span>}
      <QuillEditor
        theme='snow'
        value={value}
        onChange={onChange}
        className='ql-container'
      />
      <style jsx>{`
        :global(.ql-container) {
          border-color: rgb(230, 230, 230) !important;
        }
        :global(.ql-toolbar) {
          border-color: rgb(230, 230, 230) !important;
        }
      `}</style>
    </div>
  );
};

export default RTFEditor;
