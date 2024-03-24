<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ReservationClient } from 'src/app.client/client.model'
import { Reservation } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { ReservationStatus } from 'src/app.reservation/reservation.status.model'
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { useAssetsStore } from 'src/stores/assets'
import { useReservationModalStore } from 'src/stores/reservationModal'
import { nightsBetweenDates } from 'src/utils/dates'
import { computed, ref, watchEffect } from 'vue'
import ReservationClientInfo from './ReservationClientInfo.vue'
import ReservationModalCost from './ReservationModalCost.vue'
import ReservationPopCalendar from './ReservationPopCalendar.vue'

const { reservationModalInfo } = storeToRefs(useReservationModalStore())

const props = defineProps<{
  reservation: Reservation
}>()

const { assets, assetsSchedules } = storeToRefs(useAssetsStore())

const currentReservation = ref<Reservation>(props.reservation)
const reservedAsset = computed(() => assets.value.find(a => a.id === props.reservation.assetId))
const selectedReservationStatusId = ref(props.reservation.statusId)
const reservationClient = ref<ReservationClient>(props.reservation.client)
const reservationStatus = ref<ReservationStatus | undefined>(ReservationStatuses.getStatusbyId(props.reservation.statusId))

const onCancelReservation = async () => {
  const success = await reservationService.cancel(props.reservation.id)
  if (success) {
    const schedule = assetsSchedules.value.find(a => a.scheduleId === props.reservation.scheduleId)
    if (schedule && schedule.reservations) {
      const index = schedule.reservations.findIndex(r => r.id === props.reservation.id)
      if (index !== -1) {
        schedule.reservations?.splice(index, 1)
      }
    }
  }
}

const reservationNightsNumber = computed(() =>
  nightsBetweenDates(currentReservation.value.startDate, currentReservation.value.endDate))

watchEffect(() => {
  currentReservation.value.statusId = selectedReservationStatusId.value
  currentReservation.value.cost.numberOfNights = reservationNightsNumber.value
})
</script>

<template>
  <q-form class="q-gutter-lg">
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <q-field filled label="Asset" readonly stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{ reservedAsset?.categoryReference }} - {{ reservedAsset?.specification }}</div>
          </template>
        </q-field>

        <reservation-pop-calendar class="q-mb-xs"
          :start="reservation.startDate"
          :end="reservation.endDate"
          :schedule-id="reservationModalInfo?.scheduleId ?? currentReservation.scheduleId"
          :hide-button="true"
          :is-readonly="true" />

        <reservation-modal-cost
          :number-of-nights="currentReservation.cost.numberOfNights"
          :cost="reservation.cost"
          :disabled="true" />
      </div>
      <div class="col-md-6 col-xs-12 q-pl-md-md">
        <div class="row">
          <div class="col-12">
            <div class="row q-gutter-sm q-mb-sm">
              <span class="col text-bold">Client</span>
            </div>
            <q-input class="q-mb-xs" filled readonly v-model="reservationClient.companyName" label="Company Name" />
            <reservation-client-info :client="reservationClient" />
          </div>
          <div class="col-12 q-mt-md">
            <div class="row q-gutter-sm q-mb-sm">
              <span class="col text-bold">Moderator</span>
            </div>
            <div class="row q-gutter-sm">
              <span>{{ reservation.moderatorName }}</span>
            </div>
          </div>
          <div class="col-12 q-mt-md">
            <div class="row q-gutter-sm q-mb-sm">
              <span class="col text-bold">Status</span>
            </div>
            <div class="row q-gutter-sm">
              <q-radio v-if="reservationStatus"
                keep-color
                v-model="reservationStatus.id"
                :val="reservationStatus.id"
                :label="reservationStatus.name"
                :color="reservationStatus.qColorCode" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-btn label="Cancel Reservation" type="button" class="q-ml-sm" color="negative" @click="onCancelReservation" flat
        v-close-popup />
    </div>
  </q-form>
</template>
