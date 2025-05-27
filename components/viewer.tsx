import Modal from '@/components/modal'

interface Props {
  url: string
  onClose: () => void
}

const Viewer = ({ url, onClose }: Props) => (
  <Modal title='Archivo' onClose={onClose}>
    <div className='relative w-full h-full'>
      <iframe src={`/api/v1/${url}`} className='absolute inset-0 w-full h-full border-0' />
    </div>
  </Modal>
)

export default Viewer
