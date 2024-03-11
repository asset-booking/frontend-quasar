<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ReservationClient } from 'src/app.client/client.model'
import { ReservationCost } from 'src/app.reservation/reservation.cost.model'
import { ReservationCreate } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { useAssetsStore } from 'src/stores/assets'
import { useClientModalStore } from 'src/stores/clientModal'
import { useReservationModalStore } from 'src/stores/reservationModal'
import { nightsBetweenDates } from 'src/utils/dates'
import { computed, ref, watchEffect } from 'vue'
import ClientModalFormCreate from './ClientModalFormCreate.vue'
import ReservationAssetSelect from './ReservationAssetSelect.vue'
import ReservationClientInfo from './ReservationClientInfo.vue'
import ReservationClientSelect from './ReservationClientSelect.vue'
import ReservationModalCost from './ReservationModalCost.vue'
import ReservationPopCalendar from './ReservationPopCalendar.vue'

const { promptReservation, reservationModalInfo } = storeToRefs(useReservationModalStore())
const { promptNewClient } = storeToRefs(useClientModalStore())
const { assetsSchedules } = storeToRefs(useAssetsStore())

const props = defineProps<{
  reservation: ReservationCreate
}>()

const currentReservation = ref<ReservationCreate>(props.reservation)
const selectedReservationStatusId = ref(props.reservation.statusId)
const selectedReservationClient = ref<ReservationClient>({
  clientId: '',
  companyName: '',
  email: '',
  companyPhoneNumber: '',
  coordinatorPhoneNumber: ''
})

const onReset = () => {
  props.reservation.clear()
  selectedReservationStatusId.value = props.reservation.statusId
}

const onSubmit = async () => {
  const success = await reservationService.create(currentReservation.value as ReservationCreate)
  if (!success) {
    return
  }

  currentReservation.value.assetIds.forEach(assetId => {
    const assetSchedule = assetsSchedules.value.find(a => a.assetId === assetId)
    if (assetSchedule) {
      if (!assetSchedule.reservations) {
        assetSchedule.reservations = []
      }

      assetSchedule.reservations.push({
        id: '',
        statusId: currentReservation.value.statusId,
        start: currentReservation.value.startDate,
        end: currentReservation.value.endDate,
        total: currentReservation.value.cost.total,
        coordinatorPhoneNumber: selectedReservationClient.value?.coordinatorPhoneNumber ?? '',
        moderatorName: 'current moderator'
      })
    }

    promptReservation.value = false
  })
}

const onDeleteReservation = async () => {
  alert('deleted')
}

const reservationNightsNumber = computed(() =>
  nightsBetweenDates(currentReservation.value.startDate, currentReservation.value.endDate))

const updateReservationDates = (start: Date, end: Date) => {
  currentReservation.value.startDate = start
  currentReservation.value.endDate = end
}

const updateCost = (newCost: ReservationCost) => {
  currentReservation.value.cost = newCost
}

const updateReservationClient = (selectedClient: ReservationClient) => {
  currentReservation.value.clientId = selectedClient.clientId
  selectedReservationClient.value = selectedClient
}

watchEffect(() => {
  currentReservation.value.statusId = selectedReservationStatusId.value
  currentReservation.value.cost.numberOfNights = reservationNightsNumber.value
})
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg">
    <div class="row q-mt-xl">
      <div class="col-md-6 col-xs-12">
        <ReservationAssetSelect :selectedAssetId="reservationModalInfo?.assetId" />

        <reservation-pop-calendar @range-update="updateReservationDates" class="q-mb-xs" :start="reservation.startDate"
          :end="reservation.endDate" :asset-id="reservationModalInfo?.assetId ?? currentReservation.assetIds[0]" />

        <reservation-modal-cost :cost="reservation.cost" @cost-update="updateCost" />
      </div>
      <div class="col-md-6 col-xs-12 q-pl-md-md">
        <div class="row">
          <div class="col-12">
            <div class="row q-gutter-sm q-mb-lg">
              <span class="col text-bold">Client</span>
              <q-btn color="secondary" size="sm" icon="add" label="New Client" @click="promptNewClient=true" />
              <client-modal-form-create />
            </div>
            <reservation-client-select @client-selected="updateReservationClient" />
            <reservation-client-info :client="selectedReservationClient" />
          </div>
          <div class="col-12 q-mt-md">
            <div class="row q-gutter-sm">
              <q-radio class="col-md-4" v-for="status in ReservationStatuses.getAllStatuses()" :key="status.id" keep-color
                v-model="selectedReservationStatusId" :val="status.id" :label="status.name" :color="status.qColorCode" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Cancel" class="q-ml-sm" color="primary" flat v-close-popup />
      <q-btn label="Clear" type="reset" class="q-ml-sm" color="warning" flat />
      <q-btn label="Delete" type="button" class="q-ml-sm" color="negative" @click="onDeleteReservation" flat
        v-close-popup />
    </div>
  </q-form>
</template>
