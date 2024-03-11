<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { Asset } from 'src/app.asset/asset.model'
import { useAssetsStore } from 'src/stores/assets'
import CalendarRow from './CalendarRow.vue'

const { assets } = storeToRefs(useAssetsStore())

</script>

<template>
  <tr v-for="asset in assets" :key="asset.id" class="asset-row">
    <CalendarRow :asset="(asset as Asset)" />
  </tr>
</template>
