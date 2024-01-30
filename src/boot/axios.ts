import axios, { AxiosRequestTransformer } from 'axios'
import { boot } from 'quasar/wrappers'
import { dateTransformer } from './axios.transformers'

const calendarApi = axios.create({
  baseURL: process.env.CALENDAR_API_URL,
  transformRequest: [dateTransformer, ...(axios.defaults.transformRequest as AxiosRequestTransformer[])]
})

export default boot(() => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
})

export { calendarApi }
