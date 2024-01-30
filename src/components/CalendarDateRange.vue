<script setup lang="ts">
import { useCalendarStore } from 'src/stores/calendar'
import { fromPopupCalendarDate, toPopupCalendarDate } from 'src/utils/date-picker'
import { daysBetweenDates } from 'src/utils/dates'
import { computed, ref } from 'vue'

const calendarStore = useCalendarStore()
const fromDate = computed(() => new Date(calendarStore.mainCalendarDateRange.firstDate))
const toDate = computed(() => new Date(calendarStore.mainCalendarDateRange.lastDate))

const proxyDateFrom = ref(toPopupCalendarDate(fromDate.value))
const proxyDateTo = ref(toPopupCalendarDate(toDate.value))
const minDateRangeDays = 10

const saveFrom = () => {
  let proxyDate = fromPopupCalendarDate(proxyDateFrom.value)

  if (daysBetweenDates(proxyDate, toDate.value) < minDateRangeDays) {
    const newDate = new Date(toDate.value)
    newDate.setMonth(newDate.getMonth() - 1)

    proxyDate = newDate
  }

  calendarStore.mainCalendarDateRange.firstDate = proxyDate
  proxyDateFrom.value = toPopupCalendarDate(proxyDate)
}

const saveTo = () => {
  let proxyDate = fromPopupCalendarDate(proxyDateTo.value)

  if (daysBetweenDates(fromDate.value, proxyDate) < minDateRangeDays) {
    const newDate = new Date(fromDate.value)
    newDate.setMonth(newDate.getMonth() + 1)

    proxyDate = newDate
  }

  calendarStore.mainCalendarDateRange.lastDate = proxyDate
  proxyDateTo.value = toPopupCalendarDate(proxyDate)
}
</script>

<template>
  <div class="row">
    <div class="q-pa-sm">
      <div class="row">
        <div class="q-mb-sm">
          <q-badge color="teal">
            <span class="q-ma-sm" style="cursor: pointer">From: {{
              fromDate.toDateString()
            }}</span>
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="proxyDateFrom">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat @click="saveFrom" v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-badge>
        </div>
      </div>
    </div>

    <div class="q-pa-sm">
      <div class="q-mb-sm">
        <q-badge color="teal">
          <span class="q-ma-sm" style="cursor: pointer">To: {{
            toDate.toDateString() }}</span>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="proxyDateTo">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="saveTo" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-badge>
      </div>
    </div>
  </div>
</template>
