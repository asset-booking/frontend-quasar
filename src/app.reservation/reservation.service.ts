// import { HttpStatusCode } from 'axios'
import { IApiService } from 'src/app.common/api.service'
// import { calendarApi } from 'src/boot/axios'
import { notifyError } from 'src/utils/site'
import { reservationFactory } from './reservation.factory'
import { Reservation } from './reservation.model'

class ReservationService implements IApiService<Reservation> {
  // private endpoint = '/api/reservations'

  async create (item: Reservation): Promise<Reservation> {
    try {
      const itemDto = reservationFactory.convertToDto(item)
      // const response = await calendarApi.post(this.endpoint, itemDto)
      itemDto.id = randomInt(1, 9999999999)
      return reservationFactory.createFromDto(itemDto)
    } catch (error: unknown) {
      notifyError('Cannot create this reservation!')
      throw error
    }
  }

  async update (item: Reservation): Promise<boolean> {
    // try {
    //   const itemDto = reservationFactory.convertToDto(item)
    //   const response = await calendarApi.put(this.endpoint, itemDto)
    //   return response.status === HttpStatusCode.NoContent
    // } catch (error: unknown) {
    //   notifyError('Cannot update this reservation! ' + item)
    //   throw error
    // }
    console.log('updated: ' + JSON.stringify(item))
    return true
  }

  async delete (item: Reservation): Promise<boolean> {
    // try {
    //   const response = await calendarApi.delete(`${this.endpoint}/?assetId=${item.assetId}&reservationId=${item.id}`)
    //   return response.status === HttpStatusCode.NoContent
    //   return true
    // } catch (error: unknown) {
    //   notifyError('Cannot delete this reservation!')
    //   throw error
    // }

    console.log('deleted: ' + JSON.stringify(item))
    return true
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

const randomInt = (min: number, max: number): number => Math.random() * (max - min) + min

export const reservationService = new ReservationService()
