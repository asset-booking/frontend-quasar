<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReservationModalStore } from 'src/stores/reservationModal'
import ReservationModalFormCreate from './ReservationModalFormCreate.vue'
import ReservationModalFormTab from './ReservationModalFormTab.vue'

const { promptReservation, reservationModalInfo } = storeToRefs(useReservationModalStore())
</script>

<template>
  <q-dialog v-model="promptReservation" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6" v-if="reservationModalInfo?.isCreateReservation">Create Reservation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <ReservationModalFormCreate v-if="reservationModalInfo?.isCreateReservation"
          :asset-id="reservationModalInfo.assetId"
          :schedule-id="reservationModalInfo.scheduleId"
          :start-date="reservationModalInfo.startDate" />
        <ReservationModalFormTab v-else-if="reservationModalInfo?.isEditReservation && reservationModalInfo.reservationId"
          :reservation-id="reservationModalInfo.reservationId" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
