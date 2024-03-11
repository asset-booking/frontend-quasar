<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PhoneNumber, PhoneTypes, ReservationClientRegister } from 'src/app.client/client.model'
import { clientService } from 'src/app.client/client.service'
import { useClientModalStore } from 'src/stores/clientModal'
import { ref } from 'vue'

const newClient = ref<ReservationClientRegister>(new ReservationClientRegister())
const companyPhoneNumber = ref<string>('')
const coordinatorPhoneNumber = ref<string>('')

const { promptNewClient } = storeToRefs(useClientModalStore())

const onSubmit = async () => {
  newClient.value.phoneNumbers = []
  newClient.value.phoneNumbers.push(new PhoneNumber(companyPhoneNumber.value, PhoneTypes.Company))
  newClient.value.phoneNumbers.push(new PhoneNumber(coordinatorPhoneNumber.value, PhoneTypes.Coordinator))

  await clientService.createClient(newClient.value)
}

</script>

<template>
  <q-dialog v-model="promptNewClient" persistent>
    <q-card style="width: 500px; max-width: 50vw;">
      <q-card-section  class="row items-center q-pb-none">
        <div class="text-h8">Add Client</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input class="q-mb-xs" filled v-model="newClient.companyName" label="Name" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.email" label="Email Address" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.street" label="Street" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.streetNumber" label="Street No." lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.zipCode" label="Zip Code" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="newClient.city" label="City" lazy-rules />
          <q-input class="q-mb-xs" filled v-model="companyPhoneNumber" label="Company Tel. No." lazy-rules />
          <q-input class="q-mb-xs" filled v-model="coordinatorPhoneNumber" label="Coordinator Tel. No." lazy-rules />

          <div  class="q-mt-lg">
            <q-btn label="Submit" type="submit" color="primary" v-close-popup />
            <q-btn label="Cancel" class="q-ml-sm" color="primary" flat v-close-popup />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
