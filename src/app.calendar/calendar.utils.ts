export const hoverCalendarColumn = (dateString: string) => {
  const elements = document.querySelectorAll(`[data-day-date='${dateString}']`)
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      el.classList.add('hover-cell')
    }
  }
}

export const unhoverCalendarColumn = (dateString: string) => {
  const elements = document.querySelectorAll(`[data-day-date='${dateString}']`)
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      el.classList.remove('hover-cell')
    }
  }
}

export const convertToDateId = (date: Date): string => date.toDateString()
