interface Props {
  emailprefix: string
  setEmailprefix: (s: string) => void
  status: string
  setStatus: (s: string) => void
  setPage: (n: number) => void
  statuses: string[]
}

const Filter = ({ emailprefix, setEmailprefix, status, setStatus, setPage, statuses }: Props) => (
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
      <option value='all'>all</option>
      {statuses?.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  </div>
)

export default Filter
