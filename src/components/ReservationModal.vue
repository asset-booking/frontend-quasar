<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Reservation, ReservationCreate } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { useReservationModalStore } from 'src/stores/reservationModal'
import { notifyErrorMessage } from 'src/utils/site'
import { ref, watchEffect } from 'vue'
import ReservationModalFormCreate from './ReservationModalFormCreate.vue'
import ReservationModalFormUpdate from './ReservationModalFormUpdate.vue'

const { promptReservation, reservationModalInfo } = storeToRefs(useReservationModalStore())
const existingReservation = ref<Reservation>()
const newReservation = ref<ReservationCreate>()
let isCreation = false

watchEffect(async () => {
  if (reservationModalInfo.value) {
    if (reservationModalInfo.value.reservationId) {
      const reservation = await reservationService.getById(reservationModalInfo.value.reservationId)
      if (!reservation) {
        notifyErrorMessage('Could not find reservation.')
        promptReservation.value = false
        return
      }
      existingReservation.value = reservation
    } else {
      isCreation = true
      newReservation.value = new ReservationCreate(
        reservationModalInfo.value.assetId,
        reservationModalInfo.value?.startDate)
    }
  }
})
</script>

<template>
  <q-dialog v-model="promptReservation" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{isCreation ? 'Create' : 'Update'}} Reservation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <ReservationModalFormCreate v-if="isCreation && newReservation" :reservation="newReservation" />
        <ReservationModalFormUpdate v-if="!isCreation && existingReservation" :reservation="existingReservation" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
