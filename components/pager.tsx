import ToolBar, { ToolButton } from '@/components/toolbar'

interface Props {
  page: number
  setPage: (page: number) => void
  hasNext: boolean
}

const Pager = ({ page, setPage, hasNext }: Props) => {
  return (
    <ToolBar className='mt-auto ml-auto'>
      <ToolButton
        icon='ChevronLeft'
        label='Más'
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
      />
      <span className='flex items-center justify-center w-12 px-2 mx-1 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700'>
        {page + 1}
      </span>
      <ToolButton
        icon='ChevronRight'
        label='Menos'
        onClick={() => setPage(page + 1)}
        disabled={!hasNext}
      />
    </ToolBar>
  )
}

export default Pager
