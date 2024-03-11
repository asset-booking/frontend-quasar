/* eslint-disable @typescript-eslint/no-explicit-any */
// request body transformer for body request
export const dateToStringTransformer = (data: any): any => {
  if (data instanceof Date) {
    data.setHours(0, 0, 0, 0)
    const date = new Date(data.getTime() - data.getTimezoneOffset() * 60 * 1000)

    return date.toISOString()
  }

  if (Array.isArray(data)) {
    return data.map(dateToStringTransformer)
  }

  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, dateToStringTransformer(value)]))
  }

  return data
}
