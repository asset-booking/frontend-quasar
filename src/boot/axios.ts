import axios, { AxiosRequestTransformer } from 'axios'
import { boot } from 'quasar/wrappers'
import { dateToStringTransformer } from './axios.transformers'

const calendarApi = axios.create({
  baseURL: process.env.CALENDAR_API_URL,
  transformRequest: [dateToStringTransformer, ...(axios.defaults.transformRequest as AxiosRequestTransformer[])]
})

export default boot(() => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
})

export { calendarApi }
