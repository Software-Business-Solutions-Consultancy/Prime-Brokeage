export const formatDate = (dt: Date) => {
  if (dt === null) {
    return '-'
  }
  const date = new Date(dt)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  };
  const dateStr = date?.toLocaleDateString(undefined, options)
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12
  const mins = date.getMinutes().toString().padStart(2, '0')
  return `${dateStr} ${hours}:${mins}${ampm}`
  // return new Date(date).toLocaleDateString('en-GB', options);
}