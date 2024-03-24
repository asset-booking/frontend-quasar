<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { AssetReservation, AssetSchedule } from 'src/app.asset/asset.model'
import { useAssetsStore } from 'src/stores/assets'
import { fromPopupCalendarDate, toPopupCalendarDate } from 'src/utils/date-picker'
import { daysBetweenDates } from 'src/utils/dates'
import { computed, ref } from 'vue'

/*  eslint func-call-spacing: ["off"]  */
const emits = defineEmits<{
  (e: 'rangeUpdate', start: Date, end: Date): void
}>()

const props = defineProps<{
  scheduleId: number,
  start: Date,
  end: Date,
  reservationId?: string,
  hideButton?: boolean,
  isReadonly?: boolean
}>()

const proxyRange = ref({
  from: toPopupCalendarDate(props.start),
  to: toPopupCalendarDate(props.end)
})

const { assetsSchedules } = storeToRefs(useAssetsStore())
const assetSchedule = computed<AssetSchedule | undefined>(() => assetsSchedules.value.find(a => a.scheduleId === props.scheduleId) as AssetSchedule)
const scheduledReservations = computed<AssetReservation[]>(() => {
  let reservations = assetSchedule?.value?.reservations as AssetReservation[] ?? []
  reservations = reservations.filter(r => r.id !== props.reservationId)
  return reservations
})

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

  if (scheduledReservations.value.length === 0) return true

  const intervalReserved = !!getReservationWithReservedDate(date)
  let dayReserved = false

  if (!intervalReserved) {
    const startReserved = scheduledReservations.value.findIndex(r => date.getTime() === r.start.getTime())
    const endReserved = scheduledReservations.value.findIndex(r => date.getTime() === r.end.getTime())

    dayReserved = !!(endReserved && endReserved !== -1) && !!(startReserved && startReserved !== -1)
  }

  return !intervalReserved && !dayReserved
}

const getReservationWithReservedDate = (date: Date): AssetReservation | undefined => {
  const reservation = scheduledReservations.value.find(r =>
    date.getTime() > r.start.getTime() &&
    date.getTime() < r.end.getTime())

  return reservation
}

</script>

<template>
  <q-field filled :readonly="props.isReadonly">
    <template v-slot:after v-if="!props.hideButton">
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
