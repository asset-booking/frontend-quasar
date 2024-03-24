<script setup lang="ts">
import { Reservation } from 'src/app.reservation/reservation.model'
import { ref } from 'vue'
import ReservationModalFormStatusSelect from './ReservationModalFormStatusSelect.vue'

const props = defineProps<{
  reservation: Reservation
}>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'statusUpdated', newStatus: number): void
}>()

const statusChanged = ref(false)
const newSelectedStatus = ref<number>(props.reservation.statusId)

const onStatusChanged = (newStatus: number) => {
  newSelectedStatus.value = newStatus
  statusChanged.value = props.reservation.statusId !== newStatus
}

const onSubmit = () => {
  emits('statusUpdated', newSelectedStatus.value)
  statusChanged.value = false
}
</script>

<template>
  <q-form @submit="onSubmit" class="q-gutter-lg">
    <div class="row q-mt-xl">
      <div class="col-12">
        <reservation-modal-form-status-select
        :status-id="reservation.statusId"
        @status-updated="onStatusChanged"/>
      </div>
    </div>
    <div>
      <q-btn label="Submit" type="submit" color="primary" :disable="!statusChanged" />
    </div>
  </q-form>
</template>
