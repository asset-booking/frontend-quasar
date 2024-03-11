import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClientModalStore = defineStore('clientModal', () => {
  const promptNewClient = ref(false)

  return {
    promptNewClient
  }
}, {
  persist: false
})
