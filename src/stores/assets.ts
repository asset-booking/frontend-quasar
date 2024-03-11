import { defineStore } from 'pinia'
import { Asset, AssetSchedule } from 'src/app.asset/asset.model'
import { ref } from 'vue'

export const useAssetsStore = defineStore('assets', () => {
  const assets = ref<Asset[]>([])
  const assetsSchedules = ref<AssetSchedule[]>([])

  return {
    assets,
    assetsSchedules
  }
})
