export interface ReservationClient {
  clientId: string
  companyName: string
  email: string
  companyPhoneNumber: string
  coordinatorPhoneNumber: string
}

export enum PhoneTypes {
  Coordinator = 1,
  Company = 2
}

export class PhoneNumber {
  constructor (number: string, type: PhoneTypes) {
    this.number = number
    this.type = type
  }

  number: string
  type: PhoneTypes
}

export class ReservationClientRegister {
  companyName = ''
  email = ''
  city = ''
  zipCode = ''
  street = ''
  streetNumber = ''
  phoneNumbers: PhoneNumber[] = []
}
