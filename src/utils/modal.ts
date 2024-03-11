import { storeToRefs } from 'pinia'
import { ReservationModalInfo } from 'src/app.reservation/reservation.modal.info'
import { useReservationModalStore } from 'src/stores/reservationModal'

const { reservationModalInfo, promptReservation } = storeToRefs(useReservationModalStore())

export const openReservationModal = (assetId: number, startDate: Date, reservationId?: string) => {
  promptReservation.value = true
  reservationModalInfo.value = new ReservationModalInfo(
    assetId,
    startDate,
    reservationId)
}

export const closeReservationModal = () => {
  promptReservation.value = false
  reservationModalInfo.value = undefined
}
