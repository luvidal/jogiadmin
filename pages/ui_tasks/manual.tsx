import { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import { ToolButton } from '@/components/toolbar'
import { upload } from '@/utils/api'

interface Props {
  task: any
  onClose: () => void
}

const scriptUrls: Record<string, string> = {
  carpeta: 'https://zeus.sii.cl/dii_cgi/carpeta_tributaria/cte_acreditar_renta_01.cgi',
  cotizaciones: 'https://webafiliados.afc.cl/WUI.AAP.OVIRTUAL/Default.aspx',
  declaracion: 'https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html',
  deuda: 'https://conocetudeuda.cmfchile.cl/informe-deudas/622/w3-contents.html',
  formulario22: 'https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html'
}

const Manual = ({ task, onClose }: Props) => {
  const [context, setContext] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      setContext(JSON.parse(task?.context))
    } catch {
      setContext({})
    }
  }, [task?.context])

  const uploadFile = async (file: File) => {
    if (!file || loading) return
    setLoading(true)
    try {
      const date = new Date().toISOString().slice(0, 10) // '2025-06-04'
      const ext = file?.name.split('.').pop()
      const filename = `${task?.script}_${date}.${ext}`
      await upload('cloud/upload', file, {
        taskid: task?.taskid,
        userid: task?.userid,
        doctypeid: task?.doctypeid,
        filename,
        mimetype: file?.type,
        size: file?.size,
        lastmodified: file?.lastModified
      })
      onClose()
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleManualSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) uploadFile(file)
    }
    input.click()
  }

  const copy = (value: string) => navigator.clipboard.writeText(value)
  const goto = (url: string) => window.open(url, '_blank')
  const url = scriptUrls[task?.script]
  const capitalize = (s: string) => s?.charAt(0).toUpperCase() + s?.slice(1)

  return (
    <Modal title={`Informe ${capitalize(task?.script)}`} onClose={onClose}>
      <div className='flex flex-col h-full gap-4 p-8'>
        <div className='flex w-full items-center justify-between gap-4'>
          <div className='text-sm font-medium w-16'>Task ID</div>
          <div className='text-sm flex-1 truncate'>{task?.taskid}</div>
          <ToolButton icon='Copy' label='Copiar' onClick={() => copy(task?.taskid)} />
        </div>
        {url && (
          <div className='flex w-full items-center justify-between gap-4'>
            <div className='text-sm font-medium w-16'>URL</div>
            <div className='text-sm flex-1 truncate'>{url}</div>
            <ToolButton icon='CornerUpRight' label='Navegar' onClick={() => goto(url)} />
          </div>
        )}
        <hr />
        <div className='flex justify-between'>
          {Object.entries(context).map(([key, value]) => {
            const isGroup = ['claveunica', 'rut', 'documento'].includes(key.toLowerCase())
            const width = isGroup ? 'w-[calc(33%-1rem)]' : 'w-full'

            return (
              <div key={key} className={`flex items-center gap-2 ${width}`}>
                <div className='text-sm font-medium'>{capitalize(key)}</div>
                <div className='text-sm flex-1 truncate'>{value}</div>
                <ToolButton icon='Copy' label={`Copiar ${key}`} onClick={() => copy(value)} />
              </div>
            )
          })}
        </div>
        <hr />
        <div
          onDrop={e => {
            e.preventDefault()
            const file = e.dataTransfer.files?.[0]
            if (file) uploadFile(file)
          }}
          onDragOver={e => e.preventDefault()}
          className='flex items-center justify-center h-1/2 border-2 border-dashed rounded text-sm text-gray-500 cursor-pointer'
          onClick={handleManualSelect}
        >
          {loading ? 'Subiendo archivo...' : 'Arrastra o haz clic para subir documento'}
        </div>
      </div>
    </Modal>

  )
}

export default Manual
