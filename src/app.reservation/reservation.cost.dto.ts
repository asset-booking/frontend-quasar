export class ReservationCostDto {
  pricePerPerson!: number
  numberOfNights!: number
  numberOfPeople: number = 1
  calculatedServiceFee!: number
  serviceFeePercentage!: number
  vatPercentage!: number
  calculatedVat!: number
  total!: number
}
