<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ReservationClient } from 'src/app.client/client.model'
import { ReservationCost } from 'src/app.reservation/reservation.cost.model'
import { ReservationCreate } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { useAssetsStore } from 'src/stores/assets'
import { useClientModalStore } from 'src/stores/clientModal'
import { useReservationModalStore } from 'src/stores/reservationModal'
import { nightsBetweenDates } from 'src/utils/dates'
import { closeReservationModal } from 'src/utils/modal'
import { computed, ref, watchEffect } from 'vue'
import ClientModalFormCreate from './ClientModalFormCreate.vue'
import ReservationAssetSelect from './ReservationAssetSelect.vue'
import ReservationClientInfo from './ReservationClientInfo.vue'
import ReservationClientSelect from './ReservationClientSelect.vue'
import ReservationModalCost from './ReservationModalCost.vue'
import ReservationModalFormStatusSelect from './ReservationModalFormStatusSelect.vue'
import ReservationPopCalendar from './ReservationPopCalendar.vue'

const { reservationModalInfo } = storeToRefs(useReservationModalStore())
const { promptNewClient } = storeToRefs(useClientModalStore())
const { assetsSchedules } = storeToRefs(useAssetsStore())

const props = defineProps<{
  scheduleId: number,
  startDate: Date
}>()

const currentReservation = ref<ReservationCreate>(new ReservationCreate(props.scheduleId, props.startDate))
const selectedReservationClient = ref<ReservationClient>({
  clientId: '',
  companyName: '',
  email: '',
  companyPhoneNumber: '',
  coordinatorPhoneNumber: ''
})

const onReset = () => {
  currentReservation.value.clear()
}

const onSubmit = async () => {
  const result = await reservationService.create(currentReservation.value as ReservationCreate)
  if (!result) return

  currentReservation.value.scheduleReservationIds.forEach(schResId => {
    const assetSchedule = assetsSchedules.value.find(a => a.scheduleId === schResId.scheduleId)
    if (assetSchedule) {
      if (!assetSchedule.reservations) {
        assetSchedule.reservations = []
      }

      assetSchedule.reservations.push({
        id: schResId.reservationId,
        statusId: currentReservation.value.statusId,
        start: currentReservation.value.startDate,
        end: currentReservation.value.endDate,
        total: currentReservation.value.cost.totalCost,
        coordinatorPhoneNumber: selectedReservationClient.value?.coordinatorPhoneNumber ?? '',
        moderatorName: 'current moderator'
      })
    }

    closeReservationModal()
  })
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

const addSelectedAsset = (assetIds: number[]) => {
  assetIds.forEach(id => {
    const scheduleId = assetsSchedules.value.find(a => a.assetId === id)?.scheduleId
    if (scheduleId) {
      currentReservation.value.addForScheduleId(scheduleId)
    }
  })
}

const onSelectedStatusChanged = (newStatusId: number) => {
  currentReservation.value.statusId = newStatusId
}

watchEffect(() => {
  currentReservation.value.cost.numberOfNights = reservationNightsNumber.value
})
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg">
    <div class="row q-mt-xl">
      <div class="col-md-6 col-xs-12">
        <ReservationAssetSelect :selectedAssetId="reservationModalInfo?.assetId" @asset-selected="addSelectedAsset" />

        <reservation-pop-calendar @range-update="updateReservationDates" class="q-mb-xs"
          :start="currentReservation.startDate"
          :end="currentReservation.endDate"
          :schedule-id="reservationModalInfo?.scheduleId
            ?? currentReservation.scheduleReservationIds[0].scheduleId" />

        <reservation-modal-cost :number-of-nights="reservationNightsNumber" @cost-update="updateCost" />
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
            <reservation-modal-form-status-select
              :status-id="currentReservation.statusId"
              @status-updated="onSelectedStatusChanged"/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Clear" type="reset" class="q-ml-sm" color="warning" flat />
    </div>
  </q-form>
</template>
