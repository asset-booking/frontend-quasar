import { Reservation } from 'src/app.reservation/reservation.model'

export class Asset {
  constructor (id: number, addressRef: string) {
    this.id = id
    this.addressRef = addressRef
  }

  id: number
  addressRef: string
  specs?: string
  specsIcons?: string
  notes?: string
  notesIcons?: string
  reservations?: Reservation[]
}

export interface AssetOption {
  id: number
  addressRef: string
  disabled: boolean
}
