<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { assetService } from 'src/app.asset/asset.service'
import { useAssetsStore } from 'src/stores/assets'
import { useCalendarStore } from 'src/stores/calendar'
import { scrollToToday } from 'src/utils/calendar'
import { notifyErrorMessage } from 'src/utils/site'
import { onBeforeMount, onMounted } from 'vue'
import CalendarDateRange from './CalendarDateRange.vue'
import CalendarHeaderDays from './CalendarHeaderDays.vue'
import CalendarHeaderMonths from './CalendarHeaderMonths.vue'
import CalendarRows from './CalendarRows.vue'
import CalendarTodayFocus from './CalendarTodayFocus.vue'
import ReservationModalForm from './ReservationModalForm.vue'

const { assets, assetsSchedules } = storeToRefs(useAssetsStore())
const { mainCalendarDateRange } = storeToRefs(useCalendarStore())

onBeforeMount(async () => {
  try {
    assets.value = await assetService.getAll()
    assetsSchedules.value = await assetService.getAssetsSchedules(
      assets.value,
      mainCalendarDateRange.value.firstDate,
      mainCalendarDateRange.value.lastDate)
  } catch (error: unknown) {
    notifyErrorMessage('Calendar reservations loading failed')
    throw error
  }
})

onMounted(() => {
  setTimeout(() => scrollToToday(), 100)
})
</script>

<template>
  <div class="col-11">
    <div class="row">
      <CalendarTodayFocus />
      <CalendarDateRange />
    </div>
  <div class="table-container">
    <table>
      <thead class="sticky-top">
        <CalendarHeaderMonths />
        <CalendarHeaderDays />
      </thead>
      <tbody>
        <CalendarRows />
      </tbody>
    </table>
  </div>
</div>
  <div>
    <ReservationModalForm />
  </div>
</template>

<style lang="sass">
table
  table-layout: fixed
  white-space: nowrap
  text-align: center
  border-collapse: separate
  border-spacing: 0
  th
    /* Apply both top and bottom borders to the <th> */
    border-top: 1px solid
    border-bottom: 1px solid
    border-right: 1px solid
  td
    /* For cells, apply the border to one of each side only (right but not left, bottom but not top) */
    border-bottom: 1px solid
    border-right: 1px solid
  th:first-child,td:first-child
    /* Apply a left border on the first <td> or <th> in a row */
    border-left: 1px solid
  tr>th:first-child,tr>td:first-child
    background: $row-headers-background-color
    position: sticky
    left: 0
</style>
