<script setup lang="ts">
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    statusId?: number
}>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'statusUpdated', statusId: number): void
}>()

const selectedReservationStatusId = ref(props.statusId ?? ReservationStatuses.Open.id)

watchEffect(() => {
  emits('statusUpdated', selectedReservationStatusId.value)
})
</script>

<template>
  <div class="row q-gutter-sm">
    <q-radio class="col-md-4" v-for="status in ReservationStatuses.getAllStatuses()"
      :key="status.id" keep-color
      v-model="selectedReservationStatusId"
      :val="status.id"
      :label="status.name"
      :color="status.qColorCode" />
  </div>
</template>
