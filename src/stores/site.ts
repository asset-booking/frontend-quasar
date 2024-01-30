import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', {
  state: () => ({
    locale: 'en-US'
  })
})
