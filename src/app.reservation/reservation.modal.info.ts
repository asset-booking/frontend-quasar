export class ReservationModalInfo {
  constructor (
    assetId: number,
    scheduleId: number,
    startDate: Date,
    reservationId?: string) {
    this.assetId = assetId
    this.startDate = startDate
    this.reservationId = reservationId
    this.scheduleId = scheduleId
  }

  assetId: number
  scheduleId: number
  startDate: Date
  reservationId?: string

  public get isCreateReservation (): boolean {
    return !this.reservationId
  }

  public get isEditReservation (): boolean {
    return !!this.reservationId
  }
}
