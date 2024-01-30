import { HttpStatusCode } from 'axios'
import { IApiService } from 'src/app.common/api.service'
import { calendarApi } from 'src/boot/axios'
import { notifyError } from 'src/utils/site'
import { reservationFactory } from './reservation.factory'
import { Reservation } from './reservation.model'

class ReservationService implements IApiService<Reservation> {
  private endpoint = '/api/reservations'

  async create (item: Reservation): Promise<Reservation> {
    try {
      const itemDto = reservationFactory.convertToDto(item)
      const response = await calendarApi.post(this.endpoint, itemDto)

      return reservationFactory.createFromDto(response.data)
    } catch (error: unknown) {
      notifyError('Cannot create this reservation!')
      throw error
    }
  }

  async update (item: Reservation): Promise<boolean> {
    try {
      const itemDto = reservationFactory.convertToDto(item)
      const response = await calendarApi.put(this.endpoint, itemDto)
      return response.status === HttpStatusCode.NoContent
    } catch (error: unknown) {
      notifyError('Cannot update this reservation!')
      throw error
    }
  }

  async delete (item: Reservation): Promise<boolean> {
    try {
      const response = await calendarApi.delete(`${this.endpoint}/?assetId=${item.assetId}&reservationId=${item.id}`)

      return response.status === HttpStatusCode.NoContent
    } catch (error: unknown) {
      notifyError('Cannot delete this reservation!')
      throw error
    }
  }

  deleteById (id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + id)
  }

  getById (id: number): Promise<Reservation | undefined> {
    throw new Error('Method not implemented.' + id)
  }

  getAll (): Promise<Reservation[]> {
    throw new Error('Method not implemented.')
  }

  getByAssetId (assetId: number): Promise<Reservation[]> {
    throw new Error('Method not implemented.' + assetId)
  }
}

export const reservationService = new ReservationService()
