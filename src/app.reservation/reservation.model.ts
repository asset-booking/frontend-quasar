import { useDefaultsStore } from 'src/stores/defaults'
import { addDays } from 'src/utils/dates'
import { ReservationCompany } from './reservation.company.model'
import { ReservationCost } from './reservation.cost.model'
import { ReservationStatuses } from './reservation.statuses'

/*  eslint space-before-function-paren: ['off']  */
const { defaultStart, defaultEnd } = useDefaultsStore()

export class Reservation {
  constructor(reservation?: Partial<Reservation>) {
    Object.assign(this, reservation)
  }

  id: number = -1
  assetId = -1
  startDate = new Date(new Date().toDateString())
  endDate = addDays(this.startDate, 1)
  statusId = ReservationStatuses.Open.id
  company: ReservationCompany = new ReservationCompany()
  costs: ReservationCost = new ReservationCost()
  location?: string

  public get isNew(): boolean {
    return this.id === -1
  }

  clear() {
    this.location = ''
    this.startDate = defaultStart
    this.endDate = defaultEnd
    this.statusId = ReservationStatuses.Open.id
    this.company = new ReservationCompany()
    this.costs = new ReservationCost()
  }
}
