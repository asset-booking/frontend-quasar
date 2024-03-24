export interface ReservationCost {
  pricePerPerson: number
  serviceFee: number
  numberOfNights: number
  vatPercentage: number
  vatCost: number
  totalCost: number
}

export const emptyCost: ReservationCost = {
  pricePerPerson: 0,
  serviceFee: 0,
  numberOfNights: 0,
  vatPercentage: 0,
  vatCost: 0,
  totalCost: 0
}
