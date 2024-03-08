<script setup lang="ts">
import { ReservationCompany } from 'src/app.reservation/reservation.company.model'
import { ref } from 'vue'

defineProps<{
  company: ReservationCompany
}>()

const client = ref<ReservationCompany>(new ReservationCompany())
const promptNewClient = ref(false)

const availableClients = ref<ReservationCompany[]>([])
availableClients.value = [
  {
    name: "Ex. Company name 1",
    email: "ex.company_1@mail.com",
    coordinatorPhoneNr: "0151-7129085",
    companyPhoneNr: "040 7210-4826"
  },
  {
    name: "Ex. Company name 2",
    email: "ex.company_2@mail.com",
    coordinatorPhoneNr: "0151-7129085",
    companyPhoneNr: "040 7210-4826"
  },
  {
    name: "Ex. Company name 3",
    email: "ex.company_3@mail.com",
    coordinatorPhoneNr: "0151-7129085",
    companyPhoneNr: "040 7210-4826"
  },
  {
    name: "Ex. Company name 4",
    email: "ex.company_4@mail.com",
    coordinatorPhoneNr: "0151-7129085",
    companyPhoneNr: "040 7210-4826"
  },
  {
    name: "Ex. Company name 5",
    email: "ex.company_5@mail.com",
    coordinatorPhoneNr: "0151-7129085",
    companyPhoneNr: "040 7210-4826"
  }
]

const newClient = ref<ReservationCompany>(new ReservationCompany())
const onSubmit = () => {
  availableClients.value.push(newClient.value)
  newClient.value = new ReservationCompany()
}

const filteredClients = ref<ReservationCompany[]>(availableClients.value)

/* eslint-disable @typescript-eslint/no-explicit-any */
const filterClients = (val: string, update: any) => {
  update(() => {
    if (val === '') {
      filteredClients.value = availableClients.value
    } else {
      const needle = val.toLowerCase()
      filteredClients.value = availableClients.value.filter(
        c => c.name.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}
</script>

<template>
  <div class="row q-gutter-sm q-mb-lg">
    <span class="col text-bold">Client Information</span>
    <q-btn color="secondary" size="sm" icon="add" label="New Client" @click="promptNewClient=true" />
  </div>
  <q-select
    class="q-mb-xs"
    filled
    v-model="client"
    :options="filteredClients"
    @filter="filterClients"
    options-dense
    use-input
    hide-selected
    fill-input
    input-debounce="200"
    label="Client"
    option-label="name" />
  <q-input class="q-mb-xs" filled readonly v-model="client.email" label="Email Address" />
  <q-input class="q-mb-xs" filled readonly v-model="client.coordinatorPhoneNr" label="Coordinator Phone Nr." />
  <q-input class="q-mb-xs" filled readonly v-model="client.companyPhoneNr" label="Company Phone Nr." />

  <q-dialog v-model="promptNewClient" persistent>
    <q-card style="width: 500px; max-width: 50vw;">
      <q-card-section  class="row items-center q-pb-none">
        <div class="text-h8">Add Client</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input class="q-mb-xs" filled v-model="newClient.name" label="Name" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.email" label="Email Address" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.street" label="Street" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.streetNumber" label="Street No." lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.zipCode" label="Zip Code" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.city" label="City" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.companyPhoneNr" label="Company Tel. No." lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.coordinatorPhoneNr" label="Coordinator Tel. No." lazy-rules />

          <div  class="q-mt-lg">
            <q-btn label="Submit" type="submit" color="primary" v-close-popup />
            <q-btn label="Cancel" class="q-ml-sm" color="primary" flat v-close-popup />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
