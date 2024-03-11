<script setup lang="ts">
import { useCalendarStore } from 'src/stores/calendar'
import CalendarRowCell from './CalendarRowCell.vue'

const props = defineProps<{
  assetId: number
}>()

const calendarStore = useCalendarStore()

</script>

<template>
  <CalendarRowCell v-for="(day) in calendarStore.calendarDays" :key="day.id"
    :asset-id="props.assetId"
    :calendar-day="day"/>
</template>
