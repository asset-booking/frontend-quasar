let buttonHovered: boolean = false
export const notifyButtonHovered = (isHovered: boolean) => {
  buttonHovered = isHovered
}

export const hoverCalendarColumn = (dateString: string) => {
  if (buttonHovered) return

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

export const convertToDateId = (date: Date): string => new Date(date).toDateString()

export const scrollToToday = () => {
  const elementId = convertToDateId(new Date())
  const element = document.getElementById(elementId)
  element?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'center' })
  hoverCalendarColumn(elementId)

  setTimeout(() => {
    unhoverCalendarColumn(elementId)
  }, 3000)
}
