<script setup lang="ts">
import { scrollToToday } from 'src/utils/calendar'
</script>

<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn color="secondary" label="Today" size="12px" @click="scrollToToday" />
  </div>
</template>
