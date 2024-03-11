import { ReservationClient } from 'src/app.client/client.model'
import { addDays } from 'src/utils/dates'
import { ReservationCost } from './reservation.cost.model'
import { ReservationStatuses } from './reservation.statuses'

export class ReservationCreate {
  constructor (assetId: number, startDate: Date) {
    this.startDate = startDate
    this.endDate = addDays(this.startDate, 1)
    this.assetIds.push(assetId)
  }

  assetIds: number[] = []
  startDate: Date
  endDate: Date
  statusId = ReservationStatuses.Open.id
  clientId = ''
  cost: ReservationCost = new ReservationCost()

  clear () {
    this.startDate = new Date(new Date().toDateString())
    this.endDate = addDays(this.startDate, 1)
    this.statusId = ReservationStatuses.Open.id
    this.cost = new ReservationCost()
  }
}

export interface Reservation {
  reservationId: string
  assetId: number
  statusId: number
  startDate: Date
  endDate: Date
  client: ReservationClient
  cost: ReservationCost
}
