<script setup lang="ts">
import { Reservation } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { nightsBetweenDates } from 'src/utils/dates'
import { computed, ref, watchEffect } from 'vue'
import ReservationModalCostDifference from './ReservationModalCostDifference.vue'
import ReservationPopCalendar from './ReservationPopCalendar.vue'

const props = defineProps<{
  reservation: Reservation
}>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'intervalUpdated', newStart: Date, newEnd: Date, newCost: number): void
}>()

const startDate = ref(props.reservation.startDate)
const endDate = ref(props.reservation.endDate)
const newCalculatedCost = ref(props.reservation.cost.totalCost)

const intervalChanged = computed(() =>
  startDate.value.getTime() !== props.reservation.startDate.getTime() ||
  endDate.value.getTime() !== props.reservation.endDate.getTime())

const updateReservationDates = (start: Date, end: Date) => {
  startDate.value = start
  endDate.value = end
}

const onSubmit = () => {
  emits('intervalUpdated', startDate.value, endDate.value, newCalculatedCost.value)
}

watchEffect(async () => {
  if (intervalChanged.value) {
    const newCost = await reservationService.getReservationCalculatedCost(
      props.reservation.cost.pricePerPerson,
      props.reservation.cost.serviceFee,
      nightsBetweenDates(startDate.value, endDate.value),
      props.reservation.cost.vatPercentage,
      1
    )

    newCalculatedCost.value = newCost.totalCost
  }
})
</script>

<template>
  <q-form @submit="onSubmit" class="q-gutter-lg">
    <div class="row q-mt-xl">
      <div class="col-12">
        <reservation-pop-calendar class="q-mb-xs"
          @range-update="updateReservationDates"
          :start="startDate"
          :end="endDate"
          :schedule-id="props.reservation.scheduleId"
          :reservation-id="props.reservation.id" />
      </div>
      <div class="col-6">
        <reservation-modal-cost-difference
          :new-cost="newCalculatedCost"
          :old-cost="props.reservation.cost.totalCost"/>
      </div>
    </div>
    <div>
      <q-btn label="Submit" type="submit" color="primary" :disable="!intervalChanged" />
    </div>
  </q-form>
</template>
