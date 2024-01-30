import { defineStore } from 'pinia'
import { addDays } from 'src/utils/dates'
import { computed, ref } from 'vue'

export const useDefaultsStore = defineStore('defaults', () => {
  const promptReservation = ref(false)
  const defaultStart = ref(new Date())
  const defaultEnd = computed(() => addDays(defaultStart.value, 1))

  const defaultAssetId = ref(-1)

  return {
    promptReservation,
    defaultAssetId,
    defaultStart,
    defaultEnd
  }
}, {
  persist: false
})
