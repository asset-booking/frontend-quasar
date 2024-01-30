import { defineStore } from 'pinia'
import { CalendarDay, CalendarMonth } from 'src/app.calendar/calendar.model'
import { useSiteStore } from 'src/stores/site'
import { convertToDateId } from 'src/utils/calendar'
import { computed, ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const siteStore = useSiteStore()

  const year = new Date().getFullYear()
  const mainCalendarDateRange = ref({
    firstDate: new Date(year, 0, 1),
    lastDate: new Date(year, 11, 31)
  })

  const isWeekendDay = (day: number): boolean => day === 0 || day === 6
  const isWeekendDate = (date: Date): boolean => isWeekendDay(date.getDay())

  const calendarDays = computed<CalendarDay[]>(() => {
    const result: CalendarDay[] = []
    let currentDate = new Date(mainCalendarDateRange.value.firstDate)
    const lastDate = new Date(mainCalendarDateRange.value.lastDate)

    while (currentDate <= lastDate) {
      result.push({
        id: convertToDateId(currentDate),
        date: new Date(currentDate),
        isWeekend: isWeekendDate(currentDate)
      })

      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    }

    return result
  })

  const calendarMonths = computed(() => {
    const result: CalendarMonth[] = []
    const groupedByYear = Object.groupBy(calendarDays.value, ({ date }) => date.getFullYear())

    Object.entries(groupedByYear).forEach(
      ([year, yearDays]) => {
        if (!yearDays) {
          return
        }

        const groupedByMonth = Object.groupBy(yearDays, ({ date }) => date.toLocaleDateString(siteStore.locale, { month: 'long' }))
        Object.entries(groupedByMonth).forEach(
          ([monthName, monthDays]) => {
            if (!monthDays) {
              return
            }

            result.push({
              id: `${year}-${monthName}`,
              year: parseInt(year),
              monthName,
              numberOfDays: monthDays.length
            })
          }
        )
      }
    )

    return result
  })

  return {
    mainCalendarDateRange,
    calendarDays,
    calendarMonths,
    isWeekendDate
  }
})
