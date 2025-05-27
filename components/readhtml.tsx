
type Props = {
    file: string
  }
  
  export default function ReadHtml({ file }: Props) {
    return (
      <iframe
        src={`/${file}`}
        className='flex-1 w-full border-none'
        style={{ height: '100%', minHeight: '100%', overflow: 'auto' }}
        title={file}
      />
    )
  }

  