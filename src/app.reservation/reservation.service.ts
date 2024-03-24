import { AxiosResponse } from 'axios'
import { calendarApi } from 'src/boot/axios'
import { notifyError, notifyErrorMessage, notifySuccessMessage } from 'src/utils/site'
import { ReservationCost, emptyCost } from './reservation.cost.model'
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
    reservation.startDate = new Date(reservation.startDate)
    reservation.endDate = new Date(reservation.endDate)

    return reservation
  }

  async create (reservation: ReservationCreate): Promise<boolean> {
    const success = await this.handleRequest(() => calendarApi.post(`${this.endpoint}/createReservation`, {
      scheduleReservationIds: reservation.scheduleReservationIds,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      statusId: reservation.statusId,
      clientId: reservation.clientId,
      PricePerPerson: reservation.cost.pricePerPerson,
      numberOfPeople: 1,
      serviceFee: reservation.cost.serviceFee,
      vatPercentage: reservation.cost.vatPercentage
    }),
    undefined,
    'Some error occured while creating the reservation.')

    if (success) {
      if (reservation.scheduleReservationIds.length > 1) notifySuccessMessage('New reservations were created.')
      else notifySuccessMessage('New reservation was created.')
    }

    return success
  }

  async cancel (reservationId: string): Promise<boolean> {
    return await this.handleRequest(() => {
      return calendarApi.put(`${this.endpoint}/cancelReservation/${reservationId}`)
    },
    'Reservation was cancelled.',
    'Some error occured while cancelling the reservation.')
  }

  async changeReservationDates (
    id: string,
    oldStart: Date,
    oldEnd: Date,
    newStart: Date,
    newEnd: Date) {
    return await this.handleRequest(
      () => calendarApi.put(`${this.endpoint}/rescheduleReservation`, {
        reservationId: id,
        oldStart,
        oldEnd,
        newStart,
        newEnd
      }),
      'Reservation dates were updated successfully.',
      'Some error occured while updating the reservation interval')
  }

  async changeReservationPrice (id: string, newPrice: number) {
    return await this.handleRequest(() => calendarApi.put(`${this.endpoint}/changePrice`, {
      reservationId: id,
      newPrice
    }),
    'Reservation price was updated successfully.',
    'Some error occured while updating the reservation price.')
  }

  async changeReservationStatus (id: string, newStatusId: number) {
    return await this.handleRequest(() => calendarApi.put(`${this.endpoint}/changeStatus`, {
      reservationId: id,
      newStatusId
    }),
    'Reservation status was updated successfully.',
    'Some error occured while updating the reservation status.')
  }

  async getReservationCalculatedCost (
    pricePerPerson: number,
    serviceFee: number,
    numberOfNights: number,
    vatPercentage: number,
    numberOfPeople = 1): Promise<ReservationCost> {
    if (!pricePerPerson) return emptyCost
    try {
      const response = await calendarApi.get(`${this.endpoint}/getReservationCost`, {
        params: {
          pricePerPerson,
          serviceFee,
          numberOfNights,
          vatPercentage,
          numberOfPeople
        }
      })

      const reservationCost = response.data as ReservationCost
      return reservationCost
    } catch (error) {
      notifyError(error)
    }

    return emptyCost
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private async handleRequest (
    request: () => Promise<AxiosResponse<any, any>>,
    successMsg?: string,
    errorMsg?: string): Promise<boolean> {
    try {
      const response = await request()

      // status code starts with 2xx - Ok, Created etc.
      if (Math.floor(response.status / 100) === 2) {
        if (successMsg) notifySuccessMessage(successMsg)
        return true
      } else {
        if (errorMsg) notifyErrorMessage(errorMsg)
      }
    } catch (error) {
      notifyError(error)
    }

    return false
  }
}

export const reservationService = new ReservationService()
