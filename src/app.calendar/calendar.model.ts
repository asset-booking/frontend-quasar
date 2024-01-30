export interface CalendarDay {
  id: string
  date: Date
  isWeekend: boolean
}

export interface CalendarDayHeader extends CalendarDay {
  displayDate: number
  shortWeekDay: string
}

export interface CalendarMonth {
  id: string
  year: number
  monthName: string
  numberOfDays: number
}
