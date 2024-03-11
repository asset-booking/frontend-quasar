<script setup lang="ts">
import { CalendarDay } from 'src/app.calendar/calendar.model'
import { useAssetsStore } from 'src/stores/assets'
import { convertToDateId, hoverCalendarColumn, unhoverCalendarColumn } from 'src/utils/calendar'
import { openReservationModal } from 'src/utils/modal'
import { computed } from 'vue'
import CalendarRowCellReservationBtn from './CalendarRowCellReservationBtn.vue'

const props = defineProps<{
  assetId: number
  calendarDay: CalendarDay
}>()

const { assetsSchedules } = useAssetsStore()
const reservation = computed(() => {
  const assetSchedule = assetsSchedules.find(s => s.assetId === props.assetId)
  return assetSchedule?.reservations?.find(({ start }) => new Date(start).getTime() === props.calendarDay.date.getTime())
})

const cellClasses = computed(() => {
  return {
    'reservation-start': !!reservation.value,
    'column-day-weekend': props.calendarDay.isWeekend,
    'column-day': !props.calendarDay.isWeekend
  }
})

const calendarDateId = computed(() => convertToDateId(props.calendarDay.date))
const openReservation = () => {
  openReservationModal(props.assetId, props.calendarDay.date, reservation.value?.id)
}
</script>

<template>
  <td
    :class="cellClasses"
    :data-day-date="calendarDateId" @mouseover="hoverCalendarColumn(calendarDateId)"
    @mouseleave="unhoverCalendarColumn(calendarDateId)" @click="openReservation">
    <CalendarRowCellReservationBtn v-if="reservation" :reservation="reservation" />
  </td>
</template>

<style lang="sass">
.reservation-start
  position: relative
.hover-cell
  background-color: $hover-color
</style>
