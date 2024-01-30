<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Reservation } from 'src/app.reservation/reservation.model'
import { useReservationStore } from 'src/stores/reservations'
import { fromPopupCalendarDate, toPopupCalendarDate } from 'src/utils/date-picker'
import { daysBetweenDates } from 'src/utils/dates'
import { computed, ref } from 'vue'

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'rangeUpdate', start: Date, end: Date): void
}>()

const props = defineProps<{
  assetId: number,
  start: Date,
  end: Date
}>()

const proxyRange = ref({
  from: toPopupCalendarDate(props.start),
  to: toPopupCalendarDate(props.end)
})

const { assets } = storeToRefs(useReservationStore())
const reservationAsset = computed(() => assets.value.find(a => a.id === props.assetId))

const reservationNightsNumber = computed(() => {
  let daysBetween = daysBetweenDates(props.start, props.end)

  return --daysBetween
})

const saveDateRange = () => {
  emits('rangeUpdate',
    fromPopupCalendarDate(proxyRange.value.from),
    fromPopupCalendarDate(proxyRange.value.to))
}

const canSave = computed(() => {
  if (!proxyRange.value || !proxyRange.value.from || !proxyRange.value.from) return false

  const start = fromPopupCalendarDate(proxyRange.value.from)
  const end = fromPopupCalendarDate(proxyRange.value.to)
  const proxyDays = daysBetweenDates(start, end)

  return proxyDays > 1
})

const resetProxyRange = () => {
  proxyRange.value.from = toPopupCalendarDate(props.start)
  proxyRange.value.to = toPopupCalendarDate(props.end)
}

const clearProxyRange = () => {
  proxyRange.value.from = ''
  proxyRange.value.to = ''
}

const filterReservedDates = (dateStr: string): boolean => {
  const date = fromPopupCalendarDate(dateStr)

  if (proxyRange.value &&
    date.getTime() >= fromPopupCalendarDate(proxyRange.value.from).getTime() &&
    date.getTime() <= fromPopupCalendarDate(proxyRange.value.to).getTime()) {
    return true
  }

  if (!reservationAsset.value) return true

  const intervalReserved = !!getReservationWithReservedDate(date)
  let dayReserved = false

  if (!intervalReserved) {
    const startReserved = reservationAsset.value.reservations?.findIndex(r => date.getTime() === r.startDate.getTime())
    const endReserved = reservationAsset.value.reservations?.findIndex(r => date.getTime() === r.endDate.getTime())

    dayReserved = !!(endReserved && endReserved !== -1) && !!(startReserved && startReserved !== -1)
  }

  return !intervalReserved && !dayReserved
}

const getReservationWithReservedDate = (date: Date): Reservation | undefined => {
  const reservation = reservationAsset.value?.reservations?.find(r =>
    date.getTime() > r.startDate.getTime() &&
    date.getTime() < r.endDate.getTime())

  return reservation as Reservation
}

</script>

<template>
  <q-field filled>
    <template v-slot:after>
      <q-btn class="calendar-btn" icon="event" round color="teal">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="proxyRange" range first-day-of-week="1" :options="filterReservedDates">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary" flat @click="saveDateRange" v-close-popup :disable="!canSave" />
              <q-btn label="Clear" color="negative" flat @click="clearProxyRange" />
              <q-btn label="Cancel" color="primary" flat @click="resetProxyRange" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>

    <template v-slot:control>
      <div class="self-center full-width no-outline">
        <div class="row q-mb-sm">
          <div class="col-4">
            Date In:
          </div>
          <q-badge class="col-8 date-badge justify-around" color="teal">
            {{ toPopupCalendarDate(props.start) }}
          </q-badge>
        </div>
        <div class="row q-mb-md">
          <div class="col-4">
            Date Out:
          </div>
          <q-badge class="col-8 date-badge justify-around" color="teal">
            {{ toPopupCalendarDate(props.end) }}
          </q-badge>
        </div>
        <div class="row">
          <div class="col-4">
            Total:
          </div>
          <q-badge class="col-8 date-badge justify-around" color="teal">
            {{ reservationNightsNumber }}
            {{ reservationNightsNumber > 1 ? 'nights' : 'night' }}
          </q-badge>
        </div>
      </div>
    </template>
  </q-field>
</template>

<style>
.date-badge {
  width: 100%;
}

.calendar-btn {
  margin-left: 10%;
}
</style>
