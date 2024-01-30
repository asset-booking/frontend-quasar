<script setup lang="ts">
import { CalendarDayHeader } from 'src/app.calendar/calendar.model'
import { useCalendarStore } from 'src/stores/calendar'
import { useSiteStore } from 'src/stores/site'
import { computed } from 'vue'

const siteStore = useSiteStore()
const calendarStore = useCalendarStore()

const calendarDayHeaders = computed<CalendarDayHeader[]>(() => calendarStore.calendarDays.map(day => {
  const calendarDayHeader: CalendarDayHeader = {
    id: day.id,
    date: day.date,
    displayDate: day.date.getDate(),
    shortWeekDay: getWeekDayShortName(day.date),
    isWeekend: calendarStore.isWeekendDate(day.date)
  }

  return calendarDayHeader
}))

const getWeekDayShortName = (date: Date) => date.toLocaleDateString(siteStore.locale, { weekday: 'short' })
</script>

<template>
  <tr>
    <th style="border-top: none;"></th>
    <th v-for="day in calendarDayHeaders" :class="day.isWeekend ? 'header-column-day-weekend' : 'header-column-day'"
      :key="day.id" :id="day.id">
      <span style="display: block;">{{ day.displayDate }}</span>
      <hr width="90%" style="margin:0;" />
      <span style="display: block;">{{ day.shortWeekDay }}</span>
    </th>
  </tr>
</template>
