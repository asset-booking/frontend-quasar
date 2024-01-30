/*  eslint space-before-function-paren: ['off']  */

export class ReservationCost {
  private _pricePerPerson = 0
  private _numberOfNights = 1
  public readonly serviceFee
  public readonly vat

  constructor(serviceFee = 20, vat = 7) {
    this.serviceFee = serviceFee
    this.vat = vat
  }

  public get calculatedServiceFee(): number {
    return this.subtotal > 0 ? this.serviceFee : 0
  }

  public set pricePerPerson(price: number) {
    this.checkNumericValue(price)
    this._pricePerPerson = price
  }

  public get pricePerPerson(): number {
    return this._pricePerPerson
  }

  public set numberOfNights(nights: number) {
    this.checkNumericValue(nights)
    this._numberOfNights = nights
  }

  public get numberOfNights(): number {
    return this._numberOfNights
  }

  public get subtotal(): number {
    return this.toTwoDecimals(this.pricePerPerson * this.numberOfNights)
  }

  public get calculatedVat(): number {
    return this.toTwoDecimals((this.subtotal + this.calculatedServiceFee) * 7 / 100)
  }

  public get total(): number {
    return this.toTwoDecimals(this.subtotal + this.calculatedServiceFee + this.calculatedVat)
  }

  checkNumericValue = (num: number) => {
    if (num < 0) {
      throw Error('Cannot be a negative value')
    }
  }

  toTwoDecimals = (value: number): number => {
    return Math.round(value * 100) / 100
  }
}
