<script setup lang="ts">
// import { storeToRefs } from 'pinia'
// import { Reservation } from 'src/app.reservation/reservation.model'
// import { reservationService } from 'src/app.reservation/reservation.service'
// import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
// import { useDefaultsStore } from 'src/stores/defaults'
// import { useReservationStore } from 'src/stores/reservations'
// import { nightsBetweenDates } from 'src/utils/dates'
// import { emptyValueValidator, positiveNumberValidator } from 'src/validators/forms'
// import { computed, ref, watchEffect } from 'vue'
// import ReservationCompanyInfo from './ReservationCompanyInfo.vue'
// import ReservationPopCalendar from './ReservationPopCalendar.vue'

// const { promptReservation } = storeToRefs(useDefaultsStore())

// const props = defineProps<{
//   reservation: Reservation
// }>()

// const reservationStore = useReservationStore()
// const reservation = ref<Reservation>(new Reservation(props.reservation))

// const onReset = () => {
//   reservation.value.clear()
//   selectedReservationStatusId.value = reservation.value.statusId
// }

// const onSubmit = async () => {
//   if (reservation.value.isNew) {
//     const newReservation = await reservationService.create(reservation.value as Reservation)
//     reservationStore.addReservation(newReservation)
//     promptReservation.value = false
//   } else {
//     const success = await reservationService.update(reservation.value as Reservation)
//     if (success) {
//       reservationStore.updateReservation(reservation.value as Reservation)
//       promptReservation.value = false
//     }
//   }
// }

// const onDeleteReservation = async () => {
//   if (reservation.value.isNew) {
//     reservationStore.removeReservation(reservation.value as Reservation)
//   } else {
//     const success = await reservationService.delete(reservation.value as Reservation)
//     if (success) {
//       reservationStore.removeReservation(reservation.value as Reservation)
//       promptReservation.value = false
//     }
//   }
// }

// const reservationNightsNumber = computed(() => nightsBetweenDates(reservation.value.startDate, reservation.value.endDate))
// const subtotalDisplay = computed(() => reservation.value.cost.subtotal.toFixed(2))
// const serviceFeeDisplay = computed(() => reservation.value.cost.calculatedServiceFee.toFixed(2))
// const calculatedVatDisplay = computed(() => reservation.value.cost.calculatedVat.toFixed(2))
// const totalDisplay = computed(() => reservation.value.cost.total.toFixed(2))

// const reservedNightsCostLabel = computed(() =>
//   `Price For x${reservationNightsNumber.value} Night${reservationNightsNumber.value > 1 ? 's' : ''}:`)

// const updateReservationDates = (start: Date, end: Date) => {
//   reservation.value.startDate = start
//   reservation.value.endDate = end
// }

// const selectedReservationStatusId = ref(reservation.value.statusId)

// watchEffect(() => {
//   reservation.value.statusId = selectedReservationStatusId.value
//   reservation.value.cost.numberOfNights = reservationNightsNumber.value
// })
</script>

<template><div></div>
  <!-- <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg">
    <div class="row q-mt-xl">
      <div class="col-md-6 col-xs-12">
        <q-field class="q-mb-xs" outlined readonly bg-color="light-blue-1">
          <template v-slot:control>
            <div class="self-center full-width no-outline">Object Id: {{ reservation.assetId }}</div>
          </template>
        </q-field>
        <q-input class="q-mb-xs" filled v-model="reservation.location" label="Location" lazy-rules
          :rules="[emptyValueValidator]" />

        <reservation-pop-calendar @range-update="updateReservationDates" class="q-mb-xs" :start="reservation.startDate"
          :end="reservation.endDate" :asset-id="reservation.assetId" />

        <q-input class="q-mb-xs" filled outlined v-model.number="reservation.cost.pricePerPerson" type="number"
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
            <q-input bg-color="light-blue-1" filled outlined v-model.number="reservation.cost.vat" readonly type="number"
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
        <q-input class="q-mt-xs" bg-color="light-blue-2" filled outlined v-model.number="totalDisplay" readonly
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
            <reservation-company-info :company="reservation.client" />
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
  </q-form> -->
</template>
