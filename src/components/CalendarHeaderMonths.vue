<script setup lang="ts">
import { useCalendarStore } from 'src/stores/calendar'

const calendarStore = useCalendarStore()
</script>

<template>
  <tr>
    <th style="border-bottom: none;"></th>
    <th v-for="month in calendarStore.calendarMonths" style="border-bottom: none;" :key="month.id"
      :colspan="month.numberOfDays">
      <span class="sticky-month-name">{{ month.year }} - {{ month.monthName }}</span>
    </th>
  </tr>
</template>
