export const dateToUTC = (date: Date) => {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset())
  return result
}

export const dateDiff = (start: Date, end: Date): number => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const endDateUtc = dateToUTC(end).getTime()
  const startDateUtc = dateToUTC(start).getTime()
  const dateDiff = (endDateUtc - startDateUtc) / millisecondsPerDay

  return dateDiff
}

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)

  return newDate
}

export const daysBetweenDates = (start: Date, end: Date): number =>
  dateDiff(start, end) + 1

export const nightsBetweenDates = (start: Date, end: Date): number =>
  dateDiff(start, end)
