
const headers = (contentType = 'application/json', extra: Record<string, string> = {}) => ({
  'X-UserId': JSON.parse(localStorage.getItem('user') || '{}')?.userid || '',
  //'X-Role': localStorage.getItem('role') || '',
  'Content-Type': contentType,
  ...extra,
})

const request = async (method: string, url: string, params?: object, isJson = true) => {
  const options: RequestInit = { method, headers: headers() }

  if (params) {
    if (method === 'GET' || method === 'DELETE') {
      url += `?${new URLSearchParams(params as Record<string, string>)}`
    } else {
      options.body = JSON.stringify(params)
    }
  }

  try {
    const res = await fetch(`/api/v1/${url}`, options)
    const text = await res.text()
    const isJsonResponse = res.headers.get('content-type')?.includes('application/json')

    if (!res.ok) throw (isJsonResponse ? JSON.parse(text) : text)
    return isJsonResponse && isJson ? JSON.parse(text) : text
  } catch (error: any) {
    console.error(`${method} error:`, error?.msg ?? error)
    return null
  }
}

export const post = (url: string, params: object = {}) => request('POST', url, params)
export const patch = (url: string, params: object = {}) => request('PATCH', url, params)
export const put = (url: string, params: object = {}) => request('PUT', url, params)
export const get = (url: string, params: Record<string, any> = {}) => request('GET', url, params)
export const del = (url: string, params: Record<string, any> = {}) => request('DELETE', url, params)

export const upload = async (url: string, file: File, params: any) => {
  if (file.size > 1024 * 1024) throw new Error('File too large (max 1MB)')

  const buffer = await file.arrayBuffer()
  const base64Buffer = Buffer.from(buffer).toString('base64')

  const body = JSON.stringify({
    filename: file.name,
    mimetype: file.type,
    size: file.size,
    lastmodified: file.lastModified,
    buffer: base64Buffer,
    ...params,
  })

  const res = await fetch(`/api/v1/${url}`, {
    method: 'POST',
    headers: headers(),
    body,
  })

  if (!res.ok) throw new Error(await res.text())
  return await res.json()
}

export const download = async (url: string) => {
  try {
    const res = await fetch(`/api/v1/${url}`, {
      method: 'GET',
      headers: headers(),
    })

    if (!res.ok) {
      console.error('DOWNLOAD: Failed to fetch file')
      return
    }

    const blob = await res.blob()
    const disposition = res.headers.get('Content-Disposition')
    let filename = 'unknown-file'
    const match = disposition?.match(/filename="?([^"]+)"?/)
    if (match?.[1]) filename = decodeURIComponent(match[1])

    const mimetype = res.headers.get('Content-Type') || 'application/octet-stream'
    const blobUrl = URL.createObjectURL(new Blob([blob], { type: mimetype }))

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  } catch (error: any) {
    console.error('Download error:', error?.message ?? error)
  }
}

export const view = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(`/api/v1/${url}`, {
      method: 'GET',
      headers: headers(),
    })

    if (!res.ok) {
      console.error('VIEW: Failed to fetch file')
      return null
    }

    const blob = await res.blob()
    const mimetype = res.headers.get('Content-Type') || 'application/octet-stream'
    return URL.createObjectURL(new Blob([blob], { type: mimetype }))
  } catch (error: any) {
    console.error('View error:', error?.message ?? error)
    return null
  }
}
