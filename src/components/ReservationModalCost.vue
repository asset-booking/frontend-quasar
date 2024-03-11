<script setup lang="ts">
import { ReservationCost } from 'src/app.reservation/reservation.cost.model'
import { positiveNumberValidator } from 'src/validators/forms'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  cost: ReservationCost
}>()

const currentCost = ref<ReservationCost>(props.cost)

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'costUpdate', newCost: ReservationCost): void
}>()

watchEffect(() =>
  emits('costUpdate', currentCost.value as ReservationCost)
)

const reservedNightsCostLabel = computed(() =>
  `Price For x${currentCost.value.numberOfNights} Night${currentCost.value.numberOfNights > 1 ? 's' : ''}:`)

const subtotalDisplay = computed(() => currentCost.value.subtotal.toFixed(2))
const serviceFeeDisplay = computed(() => currentCost.value.calculatedServiceFee.toFixed(2))
const calculatedVatDisplay = computed(() => currentCost.value.calculatedVat.toFixed(2))
const totalDisplay = computed(() => currentCost.value.total.toFixed(2))
</script>

<template>
  <q-input class="q-mb-xs" filled outlined v-model.number="currentCost.pricePerPerson" type="number"
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
            <q-input bg-color="light-blue-1" filled outlined v-model.number="currentCost.vat" readonly type="number"
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
</template>
