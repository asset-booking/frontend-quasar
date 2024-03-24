<script setup lang="ts">
import { ReservationCost, emptyCost } from 'src/app.reservation/reservation.cost.model'
import { reservationService } from 'src/app.reservation/reservation.service'
import { positiveNumberValidator } from 'src/validators/forms'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  numberOfNights: number,
  cost?: ReservationCost,
  disabled?: boolean,
  numberOfPeople?: 1
}>()

const serviceFee = 20
const vatPercentage = 7

const currentCost = ref<ReservationCost>(props.cost ?? emptyCost)
const pricePerPerson = ref<number>(currentCost.value.pricePerPerson)
const subtotalDisplay = computed(() => (currentCost.value.pricePerPerson * currentCost.value.numberOfNights).toFixed(2))
const serviceFeeDisplay = computed(() => currentCost.value.serviceFee.toFixed(2))
const calculatedVatDisplay = computed(() => currentCost.value.vatCost.toFixed(2))
const totalDisplay = computed(() => currentCost.value.totalCost.toFixed(2))

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'costUpdate', newCost: ReservationCost): void
}>()

watchEffect(async () => {
  if (props.disabled) return

  const newCost = await reservationService.getReservationCalculatedCost(
    pricePerPerson.value,
    pricePerPerson.value === 0 ? 0 : serviceFee,
    props.numberOfNights,
    vatPercentage,
    props.numberOfPeople
  )

  currentCost.value = newCost
  emits('costUpdate', newCost)
})

const reservedNightsCostLabel = computed(() =>
  `Price For x${currentCost.value.numberOfNights} Night${currentCost.value.numberOfNights > 1 ? 's' : ''}:`)
</script>

<template>
  <q-input class="q-mb-xs" filled outlined v-model.number="pricePerPerson" :readonly="props.disabled" type="number"
    prefix="Price Per Night:" input-style="text-align: right; font-weight: bold;" lazy-rules step=".01"
    :rules="[positiveNumberValidator]">
    <template v-slot:append>
      <q-avatar>
        <img src="~assets/euro-currency-symbol.svg">
      </q-avatar>
    </template>
  </q-input>

  <q-field filled bg-color="light-blue-1" readonly :prefix="reservedNightsCostLabel">
    <template v-slot:control>
      <div class="full-width" style="text-align: right;">
        <span style="font-weight: bold;">{{subtotalDisplay}}</span>
      </div>
    </template>
    <template v-slot:append>
      <q-avatar>
        <img src="~assets/euro-currency-symbol.svg">
      </q-avatar>
    </template>
  </q-field>
  <q-field filled bg-color="light-blue-1" readonly :prefix="'Service Fee:'">
    <template v-slot:control>
      <div class="full-width" style="text-align: right;">
        <span style="font-weight: bold;">{{serviceFeeDisplay}}</span>
      </div>
    </template>
    <template v-slot:append>
      <q-avatar>
        <img src="~assets/euro-currency-symbol.svg">
      </q-avatar>
    </template>
  </q-field>
  <div class="row">
    <div class="col-5">
      <q-field filled bg-color="light-blue-1" readonly :prefix="'VAT:'">
        <template v-slot:control>
          <div class="full-width" style="text-align: right;">
            <span style="font-weight: bold;">{{currentCost.vatPercentage}}</span>
          </div>
        </template>
        <template v-slot:append>
          <q-avatar>
            <img src="~assets/percentage-circle.svg">
          </q-avatar>
        </template>
      </q-field>
    </div>
    <div class="col-7 q-pl-xs">
      <q-field filled bg-color="light-blue-1" readonly :prefix="'VAT Cost:'">
        <template v-slot:control>
          <div class="full-width" style="text-align: right;">
            <span style="font-weight: bold;">{{calculatedVatDisplay}}</span>
          </div>
        </template>
        <template v-slot:append>
          <q-avatar>
            <img src="~assets/euro-currency-symbol.svg">
          </q-avatar>
        </template>
      </q-field>
    </div>
  </div>
  <q-field class="q-mt-xs" filled bg-color="light-blue-2" readonly>
    <template v-slot:prepend>
      <span class="text-weight-bold text-h6">Reservation Total:</span>
    </template>
    <template v-slot:control>
      <div class="full-width" style="text-align: right;">
        <span style="font-weight: bold;">{{totalDisplay}}</span>
      </div>
    </template>
    <template v-slot:append>
      <q-avatar>
        <img src="~assets/euro-currency-symbol.svg">
      </q-avatar>
    </template>
  </q-field>
</template>
