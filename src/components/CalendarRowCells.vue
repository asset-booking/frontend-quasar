<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Asset } from 'src/app.asset/asset.model'
import { CalendarDay } from 'src/app.calendar/calendar.model'
import { useCalendarStore } from 'src/stores/calendar'
import { useDefaultsStore } from 'src/stores/defaults'
import { useReservationStore } from 'src/stores/reservations'
import { convertToDateId, hoverCalendarColumn, unhoverCalendarColumn } from 'src/utils/calendar'
import CalendarRowCellReservationBtn from './CalendarRowCellReservationBtn.vue'

const props = defineProps<{
  asset: Asset
}>()

const calendarStore = useCalendarStore()
const reservationStore = useReservationStore()

const getAssetCellClass = (day: CalendarDay) => {
  return {
    'reservation-start': reservationStore.getReservationByStartDate(props.asset.id, day.date)
  }
}

const { defaultStart, defaultAssetId, promptReservation } = storeToRefs(useDefaultsStore())

const openReservationForm = (day: CalendarDay) => {
  defaultStart.value = day.date
  promptReservation.value = true
  defaultAssetId.value = props.asset.id
}
</script>

<template>
  <td v-for="(day) in calendarStore.calendarDays" :key="day.id"
    :class="[getAssetCellClass(day), day.isWeekend ? 'column-day-weekend' : 'column-day']"
    :data-day-date="convertToDateId(day.date)" @mouseover="hoverCalendarColumn(convertToDateId(day.date))"
    @mouseleave="unhoverCalendarColumn(convertToDateId(day.date))" @click="() => openReservationForm(day)">
    <CalendarRowCellReservationBtn :reservation="reservationStore.getReservationByStartDate(props.asset.id, day.date)" />
  </td>
</template>

<style lang="sass">
.reservation-start
  position: relative
.hover-cell
  background-color: $hover-color
</style>
