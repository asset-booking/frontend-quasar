export class ReservationModalInfo {
  constructor (
    assetId: number,
    startDate: Date,
    reservationId?: string) {
    this.assetId = assetId
    this.startDate = startDate
    this.reservationId = reservationId
  }

  assetId: number
  startDate: Date
  reservationId?: string
}
