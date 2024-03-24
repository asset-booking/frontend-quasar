<script setup lang="ts">
import { Reservation } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { notifyErrorMessage } from 'src/utils/site'
import { onBeforeMount, ref } from 'vue'
import ReservationModalFormTabInfo from './ReservationModalFormTabInfo.vue'
import ReservationModalFormTabUpdate from './ReservationModalFormTabUpdate.vue'

const props = defineProps<{
  reservationId: string
}>()

const existingReservation = ref<Reservation>()
const tab = ref('info')

const updateReservation = (updatedReservation: Reservation) => {
  existingReservation.value = updatedReservation
}

onBeforeMount(async () => {
  const reservation = await reservationService.getById(props.reservationId)
  if (reservation) {
    existingReservation.value = reservation
    return
  }

  notifyErrorMessage('Could not find reservation.')
})

</script>

<template>
  <div class="q-mt-lg">
    <div class="q-gutter-lg">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator>
          <q-tab name="info" label="Info" />
          <q-tab name="update" label="Update" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info">
            <reservation-modal-form-tab-info v-if="existingReservation"
              :reservation="existingReservation" />
          </q-tab-panel>

          <q-tab-panel name="update">
            <reservation-modal-form-tab-update v-if="existingReservation"
              :reservation="existingReservation"
              @reservation-updated="updateReservation"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
