import { HttpStatusCode } from 'axios'
import { calendarApi } from 'src/boot/axios'
import { notifyError, notifyErrorMessage, notifySuccessMessage } from 'src/utils/site'
import { Reservation, ReservationCreate } from './reservation.model'

class ReservationService {
  private endpoint = '/api/reservation'

  async getById (id: string): Promise<Reservation | undefined> {
    const response = await calendarApi.get(`${this.endpoint}/getById`, {
      params: {
        id
      }
    })

    const reservation = response.data as Reservation
    return reservation
  }

  async create (reservation: ReservationCreate): Promise<boolean> {
    try {
      const response = await calendarApi.post(`${this.endpoint}/createReservation`, {
        assetIds: reservation.assetIds,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        statusId: reservation.statusId,
        clientId: reservation.clientId,
        PricePerPerson: reservation.cost.pricePerPerson,
        numberOfPeople: 1,
        serviceFee: reservation.cost.serviceFee,
        vatPercentage: reservation.cost.vat
      })

      if (response.status === HttpStatusCode.Ok) {
        notifySuccessMessage('New reservation was created.')
        return true
      } else {
        notifyErrorMessage('Some error occured while creating the reservation.')
      }
    } catch (error) {
      notifyError(error)
    }

    return false
  }
}

export const reservationService = new ReservationService()
