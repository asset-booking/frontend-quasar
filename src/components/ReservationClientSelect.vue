<script setup lang="ts">
import { ReservationClient } from 'src/app.client/client.model'
import { clientService } from 'src/app.client/client.service'
import { ref, watchEffect } from 'vue'

const availableClients = ref<ReservationClient[]>([])
const filteredClients = ref<ReservationClient[]>(availableClients.value)
const selectedClient = ref<ReservationClient>()

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'clientSelected', client: ReservationClient): void
}>()

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterClients = async (val: string, update: any) => {
  if (val.length > 2) {
    availableClients.value = await clientService.getByCompanyName(val)
  }

  update(() => {
    if (val === '') {
      filteredClients.value = availableClients.value
    } else {
      const needle = val.toLowerCase()
      filteredClients.value = availableClients.value.filter(
        c => c.companyName.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

watchEffect(() => {
  if (selectedClient.value) {
    emits('clientSelected', selectedClient.value)
  }
})
</script>

<template>
  <q-select
    class="q-mb-xs"
    filled
    v-model="selectedClient"
    :options="filteredClients"
    @filter="filterClients"
    options-dense
    use-input
    hide-selected
    fill-input
    input-debounce="200"
    label="Client"
    option-label="companyName" />
</template>
