<script setup lang="ts">
import { ReservationCompany } from 'src/app.reservation/reservation.company.model'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  company: ReservationCompany
}>()

const company = ref<ReservationCompany>(props.company)

watchEffect(() => {
  company.value = props.company
})
</script>

<template>
  <q-field class="q-mb-xs" readonly>
    <template v-slot:control>
      <div class="self-center full-width no-outline">
        <span class="text-bold">Company Information:</span>
      </div>
    </template>
  </q-field>
  <q-input class="q-mb-xs" filled v-model="company.name" label="Name" lazy-rules />
  <q-input class="q-mb-xs" filled v-model="company.street" label="Street" lazy-rules />
  <q-input class="q-mb-xs" filled v-model="company.streetNumber" label="Street No." lazy-rules />
  <q-input class="q-mb-xs" filled v-model="company.zipCode" label="Zip Code" lazy-rules />
  <q-input class="q-mb-xs" filled v-model="company.city" label="City" lazy-rules />
  <q-input class="q-mb-xs" filled v-model="company.telephoneNumber" label="Tel. No." lazy-rules />
</template>
