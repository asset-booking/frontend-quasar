<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Asset } from 'src/app.asset/asset.model'
import { useAssetsStore } from 'src/stores/assets'
import { computed } from 'vue'
import CalendarRowCells from './CalendarRowCells.vue'
import CalendarRowHeader from './CalendarRowHeader.vue'

const props = defineProps<{
  asset: Asset
}>()

const { assetsSchedules } = storeToRefs(useAssetsStore())

const scheduleId = computed(() => {
  const schedule = assetsSchedules.value.find(s => s.assetId === props.asset.id)
  if (schedule) {
    return schedule.scheduleId
  }

  return -1
})

</script>

<template>
  <CalendarRowHeader :asset="props.asset" />
  <CalendarRowCells :asset-id="props.asset.id" :schedule-id="scheduleId" />
</template>
