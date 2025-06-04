interface Props {
  emailprefix: string
  setEmailprefix: (s: string) => void
  status: string
  setStatus: (s: string) => void
  setPage: (n: number) => void
}

const Filter = ({ emailprefix, setEmailprefix, status, setStatus, setPage }: Props) => (
  <div className='flex gap-2'>
    <input
      className='border p-2 rounded w-1/2'
      placeholder='Email ...'
      value={emailprefix}
      onChange={e => {
        setEmailprefix(e.target.value)
        setPage(0)
      }}
    />
    <select
      className={`border p-2 rounded w-1/2 ${!status ? 'text-gray-400' : 'text-black'}`}
      value={status}
      onChange={e => {
        setStatus(e.target.value)
        setPage(0)
      }}
    >
      <option value='not-success'>Estado ...</option>
      <option value='pending'>Pendiente</option>
      <option value='running'>Corriendo</option>
      <option value='success'>Exito</option>
      <option value='failed'>Fracaso</option>
    </select>
  </div>
)

export default Filter
