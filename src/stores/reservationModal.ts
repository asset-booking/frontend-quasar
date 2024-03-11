import { defineStore } from 'pinia'
import { ReservationModalInfo } from 'src/app.reservation/reservation.modal.info'
import { ref } from 'vue'

export const useReservationModalStore = defineStore('reservationModal', () => {
  const promptReservation = ref(false)
  const reservationModalInfo = ref<ReservationModalInfo>()

  return {
    promptReservation,
    reservationModalInfo
  }
}, {
  persist: false
})
