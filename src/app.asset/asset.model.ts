import { Reservation } from 'src/app.reservation/reservation.model'

export class Asset {
  id!: number
  addressRef!: string
  specs?: string
  notes?: string
  reservations?: Reservation[]
}
