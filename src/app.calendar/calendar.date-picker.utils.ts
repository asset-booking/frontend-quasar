const toTwoDigitsStringNumber = (num: number) => `${num < 10 ? '0' : ''}${num}`

export const toPopupCalendarDate = (date: Date) => {
  const year = date.getFullYear()
  const month = toTwoDigitsStringNumber(date.getMonth() + 1)
  const dateStr = toTwoDigitsStringNumber(date.getDate())

  return `${year}/${month}/${dateStr}`
}

export const fromPopupCalendarDate = (date: string) => {
  const [year, month, day] = date.split('/')
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  return dateObj
}
