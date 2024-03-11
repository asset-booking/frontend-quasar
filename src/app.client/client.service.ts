import { HttpStatusCode } from 'axios'
import { calendarApi } from 'src/boot/axios'
import { notifyError, notifyErrorMessage, notifySuccessMessage } from 'src/utils/site'
import { ReservationClient, ReservationClientRegister } from './client.model'

class ClientService {
  private endpoint = '/api/client'

  async getByCompanyName (companyName: string) : Promise<ReservationClient[]> {
    const response = await calendarApi.get(`${this.endpoint}/getByCompanyName`, {
      params: {
        companyName
      }
    })
    const data = response.data as ReservationClient[] ?? []

    return data
  }

  async createClient (client: ReservationClientRegister) : Promise<void> {
    try {
      const response = await calendarApi.post(`${this.endpoint}/register`, {
        companyName: client.companyName,
        email: client.email,
        city: client.city,
        zipCode: client.zipCode,
        street: client.street,
        streetNumber: client.streetNumber,
        phoneNumbers: client.phoneNumbers
      })

      if (response.status === HttpStatusCode.Ok) {
        notifySuccessMessage('Client registered.')
      } else {
        notifyErrorMessage('Client information was not saved successfully.')
      }
    } catch (error) {
      notifyError(error)
    }
  }
}

export const clientService = new ClientService()
