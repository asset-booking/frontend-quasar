<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ReservationCost } from 'src/app.reservation/reservation.cost.model'
import { Reservation } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { useAssetsStore } from 'src/stores/assets'
import { nightsBetweenDates } from 'src/utils/dates'
import { computed, ref } from 'vue'
import ReservationModalFormTabUpdateInterval from './ReservationModalFormTabUpdateInterval.vue'
import ReservationModalFormTabUpdatePrice from './ReservationModalFormTabUpdatePrice.vue'
import ReservationModalFormTabUpdateStatus from './ReservationModalFormTabUpdateStatus.vue'

const props = defineProps<{
  reservation: Reservation
}>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'reservationUpdated', updatedReservation: Reservation): void
}>()

const tab = ref('interval')
const splitterModel = ref(20)

const { assetsSchedules } = storeToRefs(useAssetsStore())
const reservationToUpdate = computed(() => props.reservation)
const scheduleReservation = computed(() => {
  const schedule = assetsSchedules.value.find(a => a.scheduleId === reservationToUpdate.value.scheduleId)
  return schedule?.reservations?.find(sr => sr.id === reservationToUpdate.value.id)
})

const updateInterval = async (newStart: Date, newEnd: Date, newCost: number) => {
  const success = await reservationService.changeReservationDates(
    reservationToUpdate.value.id,
    reservationToUpdate.value.startDate,
    reservationToUpdate.value.endDate,
    newStart,
    newEnd)

  if (success) {
    reservationToUpdate.value.startDate = newStart
    reservationToUpdate.value.endDate = newEnd
    reservationToUpdate.value.cost.numberOfNights = nightsBetweenDates(newStart, newEnd)
    reservationToUpdate.value.cost.totalCost = newCost

    if (scheduleReservation.value) {
      scheduleReservation.value.start = newStart
      scheduleReservation.value.end = newEnd
      scheduleReservation.value.total = newCost
    }

    emits('reservationUpdated', reservationToUpdate.value)
  }
}

const updateCost = async (newCost: ReservationCost) => {
  const success = await reservationService.changeReservationPrice(
    reservationToUpdate.value.id,
    newCost.pricePerPerson
  )

  if (success) {
    reservationToUpdate.value.cost = newCost

    if (scheduleReservation.value) {
      scheduleReservation.value.total = newCost.totalCost
    }

    emits('reservationUpdated', reservationToUpdate.value)
  }
}

const updateStatus = async (newStatus: number) => {
  const success = await reservationService.changeReservationStatus(
    reservationToUpdate.value.id,
    newStatus)

  if (success) {
    reservationToUpdate.value.statusId = newStatus

    if (scheduleReservation.value) {
      scheduleReservation.value.statusId = newStatus
    }

    emits('reservationUpdated', reservationToUpdate.value)
  }
}
</script>

<template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab name="interval" icon="date_range" label="Date Range" />
          <q-tab name="price" icon="euro" label="Price" />
          <q-tab name="status" icon="change_circle" label="Status" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="interval">
            <reservation-modal-form-tab-update-interval
              :reservation = "reservationToUpdate"
              @interval-updated="updateInterval" />
          </q-tab-panel>

          <q-tab-panel name="price">
            <reservation-modal-form-tab-update-price
              :reservation="reservationToUpdate"
              @cost-updated="updateCost"/>
          </q-tab-panel>

          <q-tab-panel name="status">
            <reservation-modal-form-tab-update-status
            :reservation="reservationToUpdate"
            @status-updated="updateStatus"/>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>
