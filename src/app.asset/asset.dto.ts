import { ReservationDto } from 'src/app.reservation/reservation.dto'

export class AssetDto {
  id!: number
  addressRef!: string
  specs?: string
  specsIcons?: string
  notes?: string
  notesIcons?: string
  reservations?: ReservationDto[]
}
