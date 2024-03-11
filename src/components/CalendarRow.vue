<script setup lang="ts">
import { Asset } from 'src/app.asset/asset.model'
import CalendarRowCells from './CalendarRowCells.vue'
import CalendarRowHeader from './CalendarRowHeader.vue'

const props = defineProps<{
  asset: Asset
}>()

</script>

<template>
  <CalendarRowHeader :asset="props.asset" />
  <CalendarRowCells :asset-id="props.asset.id" />
</template>
