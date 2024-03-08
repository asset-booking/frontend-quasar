<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Asset, AssetOption } from 'src/app.asset/asset.model'
import { assetService } from 'src/app.asset/asset.service'
import { Reservation } from 'src/app.reservation/reservation.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { useDefaultsStore } from 'src/stores/defaults'
import { useReservationStore } from 'src/stores/reservations'
import { nightsBetweenDates } from 'src/utils/dates'
import { positiveNumberValidator } from 'src/validators/forms'
import { computed, onMounted, ref, watchEffect } from 'vue'
import ReservationCompanyInfo from './ReservationCompanyInfo.vue'
import ReservationPopCalendar from './ReservationPopCalendar.vue'

const { promptReservation } = storeToRefs(useDefaultsStore())

const props = defineProps<{
  reservation: Reservation
}>()

const reservationStore = useReservationStore()
const reservation = ref<Reservation>(new Reservation(props.reservation))

const onReset = () => {
  reservation.value.clear()
  selectedReservationStatusId.value = reservation.value.statusId
}

const onSubmit = async () => {
  if (reservation.value.isNew) {
    const newReservation = await reservationService.create(reservation.value as Reservation)
    reservationStore.addReservation(newReservation)
    promptReservation.value = false
  } else {
    const success = await reservationService.update(reservation.value as Reservation)
    if (success) {
      reservationStore.updateReservation(reservation.value as Reservation)
      promptReservation.value = false
    }
  }
}

const onDeleteReservation = async () => {
  if (reservation.value.isNew) {
    reservationStore.removeReservation(reservation.value as Reservation)
  } else {
    const success = await reservationService.delete(reservation.value as Reservation)
    if (success) {
      reservationStore.removeReservation(reservation.value as Reservation)
      promptReservation.value = false
    }
  }
}

const reservationNightsNumber = computed(() => nightsBetweenDates(reservation.value.startDate, reservation.value.endDate))
const subtotalDisplay = computed(() => reservation.value.costs.subtotal.toFixed(2))
const serviceFeeDisplay = computed(() => reservation.value.costs.calculatedServiceFee.toFixed(2))
const calculatedVatDisplay = computed(() => reservation.value.costs.calculatedVat.toFixed(2))
const totalDisplay = computed(() => reservation.value.costs.total.toFixed(2))

const reservedNightsCostLabel = computed(() =>
  `Price For x${reservationNightsNumber.value} Night${reservationNightsNumber.value > 1 ? 's' : ''}:`)

const updateReservationDates = (start: Date, end: Date) => {
  reservation.value.startDate = start
  reservation.value.endDate = end
}

const selectedReservationStatusId = ref(reservation.value.statusId)

const availableAssets = ref<Asset[]>([])
const selectedAssets = ref<AssetOption[]>([])

const assetOptions = ref<AssetOption[]>([])
const filteredAssets = ref<AssetOption[]>(assetOptions.value)

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterAssets = (val: string, update: any) => {
  update(() => {
    if (val === '') {
      filteredAssets.value = assetOptions.value
    } else {
      const needle = val.toLowerCase()
      filteredAssets.value = assetOptions.value.filter(
        a => a.addressRef.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

watchEffect(() => {
  reservation.value.statusId = selectedReservationStatusId.value
  reservation.value.costs.numberOfNights = reservationNightsNumber.value
})

onMounted(async () => {
  availableAssets.value = await assetService.getAll()
  availableAssets.value.forEach(asset => {
    assetOptions.value.push({
      id: asset.id,
      addressRef: asset.addressRef + (asset.specs ? ` - ${asset.specs}` : ''),
      disabled: asset.id === props.reservation.assetId
    })
  })

  const selectedAsset = assetOptions.value.find(a => a.id === props.reservation.assetId)
  if (selectedAsset) {
    selectedAssets.value.push(selectedAsset)
  }
})
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg">
    <div class="row q-mt-xl">
      <div class="col-md-6 col-xs-12">
        <q-select class="q-mb-lg"
          hide-bottom-space
          options-dense
          @filter="filterAssets"
          use-input
          input-debounce="200"
          counter
          hint="Selected assets"
          hide-selected
          filled
          v-model="selectedAssets"
          :options="filteredAssets"
          option-disable="disabled"
          label="Assets"
          multiple>
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" :label="opt.addressRef" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <reservation-pop-calendar @range-update="updateReservationDates" class="q-mb-xs" :start="reservation.startDate"
          :end="reservation.endDate" :asset-id="reservation.assetId" />

        <q-input class="q-mb-xs" filled outlined v-model.number="reservation.costs.pricePerPerson" type="number"
          prefix="Price Per Night:" input-style="text-align: right; font-weight: bold;" lazy-rules step=".01"
          :rules="[positiveNumberValidator]">
          <template v-slot:append>
            <q-avatar>
              <img src="~assets/euro-currency-symbol.svg">
            </q-avatar>
          </template>
        </q-input>

        <q-input bg-color="light-blue-1" filled outlined v-model.number="subtotalDisplay" readonly type="number"
          :prefix="reservedNightsCostLabel" input-style="text-align: right; font-weight: bold;">
          <template v-slot:append>
            <q-avatar>
              <img src="~assets/euro-currency-symbol.svg">
            </q-avatar>
          </template>
        </q-input>
        <q-input bg-color="light-blue-1" filled outlined v-model.number="serviceFeeDisplay" readonly type="number"
          prefix="Service Fee:" input-style="text-align: right; font-weight: bold;">
          <template v-slot:append>
            <q-avatar>
              <img src="~assets/euro-currency-symbol.svg">
            </q-avatar>
          </template>
        </q-input>
        <div class="row">
          <div class="col-5">
            <q-input bg-color="light-blue-1" filled outlined v-model.number="reservation.costs.vat" readonly type="number"
              prefix="VAT:" input-style="text-align: right; font-weight: bold;">
              <template v-slot:append>
                <q-avatar>
                  <img src="~assets/percentage-circle.svg">
                </q-avatar>
              </template>
            </q-input>
          </div>
          <div class="col-7 q-pl-xs">
            <q-input bg-color="light-blue-1" filled outlined v-model.number="calculatedVatDisplay" readonly type="number"
              prefix="VAT Cost:" input-style="text-align: right; font-weight: bold;">
              <template v-slot:append>
                <q-avatar>
                  <img src="~assets/euro-currency-symbol.svg">
                </q-avatar>
              </template>
            </q-input>
          </div>
        </div>
        <q-input class="q-mt-xs q-mb-lg" bg-color="light-blue-2" filled outlined v-model.number="totalDisplay" readonly
          type="number" input-style="text-align: right; font-weight: bold;">
          <template v-slot:prepend>
            <span class="text-weight-bold text-h6">Reservation Total:</span>
          </template>
          <template v-slot:append>
            <q-avatar>
              <img src="~assets/euro-currency-symbol.svg">
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col-md-6 col-xs-12 q-pl-md-md">
        <div class="row">
          <div class="col-12">
            <reservation-company-info :company="reservation.company" />
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
