<script setup lang="ts">
import { Reservation } from 'src/app.reservation/reservation.model'
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { convertToDateId, notifyButtonHovered, unhoverCalendarColumn } from 'src/utils/calendar'
import { daysBetweenDates } from 'src/utils/dates'
import { computed } from 'vue'

const props = defineProps<{
  reservation?: Reservation
}>()

const getBtnStyle = () => {
  const status = ReservationStatuses.getStatusbyId(props.reservation?.statusId)

  if (status) {
    return `${calculateReservationBtnWidth()}background: ${status.colorCode};`
  }
}

const calculateReservationBtnWidth = () => {
  const numberOfDays = props.reservation
    ? daysBetweenDates(props.reservation.startDate, props.reservation.endDate)
    : 0

  return `width: calc(${numberOfDays * 100 - 110}% + ${numberOfDays}px);`
}

const tooltipClass = computed(() => `bg-${ReservationStatuses.getStatusbyId(props.reservation?.statusId)?.qColorCode}`)

const unhoverFirstColumn = () => {
  notifyButtonHovered(true)
  if (props.reservation?.startDate) {
    const dayId = convertToDateId(props.reservation?.startDate)
    unhoverCalendarColumn(dayId)
  }
}
</script>

<template>
  <button v-if="reservation"
    class="reservation-btn"
    :style="getBtnStyle()"
    @mouseenter="unhoverFirstColumn"
    @mouseleave="() => notifyButtonHovered(false)">
    <span v-if="reservation.company.name">{{ reservation.company.name }}</span>
    <span v-if="reservation.company.telephoneNumber" class="q-ml-lg">{{ reservation.company.telephoneNumber }}</span>
    <q-tooltip :class="tooltipClass">
      <div>
        <span>Location: {{ reservation.location }}</span>
      </div>
      <div>
        <span>Total Cost: {{ reservation.costs.total }} &#8364;</span>
      </div>
    </q-tooltip>
  </button>
</template>

<style lang="sass">
.reservation-btn
  cursor: pointer
  height: 70%
  top: 15%
  left: 55%
  position: absolute
  overflow: scroll
  -ms-overflow-style: none  ///* Hide scrollbar - IE and Edge */
  scrollbar-width: none  ///* Hide scrollbar - Firefox */
  z-index: 1
  transform: skewx(-$skew-angle)

/* Hide scrollbar - Chrome, Safari and Opera */
.reservation-btn::-webkit-scrollbar
  display: none

.reservation-btn span
  display: block
  transform: skewx($skew-angle)
</style>
