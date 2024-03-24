<script setup lang="ts">
import { AssetReservation } from 'src/app.asset/asset.model'
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { convertToDateId, notifyButtonHovered, unhoverCalendarColumn } from 'src/utils/calendar'
import { daysBetweenDates } from 'src/utils/dates'
import { computed } from 'vue'

const props = defineProps<{
  reservation: AssetReservation
}>()

const getBtnStyle = () => {
  const status = ReservationStatuses.getStatusbyId(props.reservation.statusId)

  if (status) {
    return `${calculateReservationBtnWidth()};
    background: radial-gradient(50px 100% at left, transparent 50%, ${status.colorCode} 0%);`
  }
}

const calculateReservationBtnWidth = () => {
  const numberOfDays = props.reservation
    ? daysBetweenDates(props.reservation.start, props.reservation.end)
    : 0

  return `width: calc(${numberOfDays * 50}px - 30px)`
}

const tooltipClass = computed(() => `bg-${ReservationStatuses.getStatusbyId(props.reservation.statusId)?.qColorCode}`)

const unhoverFirstColumn = () => {
  notifyButtonHovered(true)
  if (props.reservation.start) {
    const dayId = convertToDateId(props.reservation.start)
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
    <span>&euro;{{ reservation.total.toFixed(2) }} / {{ reservation.coordinatorPhoneNumber }}</span>
    <span>{{ reservation.moderatorName }}</span>
    <q-tooltip :class="tooltipClass">
      <div>
        <span>Total Cost: {{ reservation.total }} &#8364;</span>
      </div>
      <div>
        <span>Coordinator Phone Number: {{ reservation.coordinatorPhoneNumber }}</span>
      </div>
      <div>
        <span>Moderator Name: {{ reservation.moderatorName }}</span>
      </div>
    </q-tooltip>
  </button>
</template>

<style lang="sass">
.reservation-btn
  cursor: pointer
  border: none
  height: 70%
  top: 15%
  left: 25%
  position: absolute
  overflow: scroll
  -ms-overflow-style: none  ///* Hide scrollbar - IE and Edge */
  scrollbar-width: none  ///* Hide scrollbar - Firefox */
  z-index: 1
  border-radius: 0px 50px 50px 0px
  span
    color: white
    padding-left: 20px

/* Hide scrollbar - Chrome, Safari and Opera */
.reservation-btn::-webkit-scrollbar
  display: none

.reservation-btn span
  display: block
</style>
