import { ReservationClient } from 'src/app.client/client.model'
import { addDays } from 'src/utils/dates'
import { v4 as uuid } from 'uuid'
import { ReservationCost, emptyCost } from './reservation.cost.model'
import { ReservationStatuses } from './reservation.statuses'

export interface ScheduleReservationId {
  scheduleId: number,
  reservationId: string
}

export class ReservationCreate {
  constructor (scheduleId: number, startDate: Date) {
    this.startDate = startDate
    this.endDate = addDays(this.startDate, 1)
    this.addForScheduleId(scheduleId)
  }

  statusId = ReservationStatuses.Open.id
  clientId = ''
  scheduleReservationIds: ScheduleReservationId[] = []
  startDate: Date
  endDate: Date
  cost: ReservationCost = emptyCost

  addForScheduleId (scheduleId: number) {
    if (this.scheduleReservationIds.find(a => a.scheduleId === scheduleId)) return

    this.scheduleReservationIds.push({
      scheduleId,
      reservationId: uuid()
    })
  }

  clear () {
    this.startDate = new Date(new Date().toDateString())
    this.endDate = addDays(this.startDate, 1)
    this.statusId = ReservationStatuses.Open.id
    this.cost = emptyCost
  }
}

export interface Reservation {
  id: string
  assetId: number
  scheduleId: number
  statusId: number
  startDate: Date
  endDate: Date
  moderatorName: string
  client: ReservationClient
  cost: ReservationCost
}
