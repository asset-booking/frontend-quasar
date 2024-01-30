<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Reservation } from 'src/app.reservation/reservation.model'
import { useDefaultsStore } from 'src/stores/defaults'
import { useReservationStore } from 'src/stores/reservations'
import { computed } from 'vue'
import ReservationModalForm from './ReservationModalForm.vue'

const { promptReservation, defaultAssetId, defaultStart, defaultEnd } = storeToRefs(useDefaultsStore())
const reservationStore = useReservationStore()

const reservation = computed(() => reservationStore.getReservationByStartDate(defaultAssetId.value, defaultStart.value) ??
  new Reservation({
    assetId: defaultAssetId.value,
    startDate: defaultStart.value,
    endDate: defaultEnd.value
  }))

</script>

<template>
  <q-dialog v-model="promptReservation" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Reservation Form</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <reservation-modal-form :reservation="reservation" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
