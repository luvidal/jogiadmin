
export const formatDate = (iso: string): string => {
    if (!iso) return iso
  
    const date = new Date(iso)
    if (isNaN(date.getTime())) return iso
  
    const day = date.getDate().toString().padStart(2, '0')
    let month = date.toLocaleString('es-CL', { month: 'short' }).toUpperCase().replace('.', '')
    const year = date.getFullYear().toString().slice(-2)
  
    return `${day}/${month}/${year}`
  }
  
export function eudate(utcString: string) {
    utcString = utcString.replace('.000Z', '').replace('T', ' ')
    const utcDate = new Date(utcString + ' UTC');
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    }
    return utcDate.toLocaleString('en-GB', options);
}