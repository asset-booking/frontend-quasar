import { storeToRefs } from 'pinia'
import { ReservationModalInfo } from 'src/app.reservation/reservation.modal.info'
import { useReservationModalStore } from 'src/stores/reservationModal'
import { watchEffect } from 'vue'
import { notifyErrorMessage } from './site'

const { reservationModalInfo, promptReservation } = storeToRefs(useReservationModalStore())

export const openReservationModal = (assetId: number, scheduleId: number, startDate: Date, reservationId?: string) => {
  if (scheduleId === -1) {
    notifyErrorMessage('Cannot create reservation for this item.')
    return
  }

  promptReservation.value = true
  reservationModalInfo.value = new ReservationModalInfo(
    assetId,
    scheduleId,
    startDate,
    reservationId)
}

export const closeReservationModal = () => {
  promptReservation.value = false
  reservationModalInfo.value = undefined
}

watchEffect(() => {
  if (!promptReservation.value) {
    reservationModalInfo.value = undefined
  }
})
