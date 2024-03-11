<script setup lang="ts">
import { ReservationClient } from 'src/app.client/client.model'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  client: ReservationClient
}>()

const currentClient = ref<ReservationClient>(props.client)

watchEffect(() => {
  currentClient.value = props.client
})
</script>

<template>
  <q-input class="q-mb-xs" filled readonly v-model="currentClient.companyPhoneNumber" label="Company Phone Nr." />
  <q-input class="q-mb-xs" filled readonly v-model="currentClient.email" label="Email Address" />
  <q-input class="q-mb-xs" filled readonly v-model="currentClient.coordinatorPhoneNumber" label="Coordinator Phone Nr." />
</template>
