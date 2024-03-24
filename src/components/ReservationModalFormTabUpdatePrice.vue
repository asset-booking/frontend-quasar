<script setup lang="ts">
import { ReservationCost } from 'src/app.reservation/reservation.cost.model'
import { Reservation } from 'src/app.reservation/reservation.model'
import { ref } from 'vue'
import ReservationModalCost from './ReservationModalCost.vue'
import ReservationModalCostDifference from './ReservationModalCostDifference.vue'

const props = defineProps<{
  reservation: Reservation
}>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'costUpdated', newCost: ReservationCost): void
}>()

const costChanged = ref(false)
const newCalculatedCost = ref<ReservationCost>(props.reservation.cost)

const onCostChanged = (newCost: ReservationCost) => {
  newCalculatedCost.value = newCost
  costChanged.value = newCalculatedCost.value.pricePerPerson !== props.reservation.cost.pricePerPerson
}

const onSubmit = () => {
  emits('costUpdated', newCalculatedCost.value)
  costChanged.value = false
}

</script>

<template>
    <q-form @submit="onSubmit" class="q-gutter-lg">
      <div class="row q-mt-xl">
        <div class="col-12">
          <reservation-modal-cost
            :number-of-nights="props.reservation.cost.numberOfNights"
            :cost="props.reservation.cost"
            @cost-update="onCostChanged"/>
        </div>
        <div class="col-6">
          <reservation-modal-cost-difference
            :new-cost="newCalculatedCost.totalCost"
            :old-cost="props.reservation.cost.totalCost"/>
        </div>
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" :disable="!costChanged" />
      </div>
    </q-form>
</template>
