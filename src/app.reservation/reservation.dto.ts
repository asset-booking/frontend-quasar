import { ReservationCompanyDto } from './reservation.company.dto'
import { ReservationCostDto } from './reservation.cost.dto'

export class ReservationDto {
  id!: number
  assetId!: number
  startDate!: Date
  endDate!: Date
  statusId!: number
  costs?: ReservationCostDto
  company?: ReservationCompanyDto
  location?: string
}
