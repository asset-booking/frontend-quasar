<script setup lang="ts">
import { convertToDateId, hoverCalendarColumn, unhoverCalendarColumn } from 'src/utils/calendar'

const scroll = () => {
  const elementId = convertToDateId(new Date())
  const element = document.getElementById(elementId)
  element?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'center' })
  hoverCalendarColumn(elementId)

  setTimeout(() => {
    unhoverCalendarColumn(elementId)
  }, 3000)
}
</script>

<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn color="secondary" label="Today" size="12px" @click="scroll" />
  </div>
</template>
