import { ReservationStatus } from './reservation.status.model'

export class ReservationStatuses {
  static Open: ReservationStatus = {
    id: 1,
    name: 'Open',
    colorCode: '#db2c2c',
    qColorCode: 'red-5'
  }

  static DownPayment: ReservationStatus = {
    id: 2,
    name: 'Down Payment',
    colorCode: '#e8b425',
    qColorCode: 'orange-6'
  }

  static Paid: ReservationStatus = {
    id: 3,
    name: 'Paid',
    colorCode: '#26c937',
    qColorCode: 'green-5'
  }

  static Enquiry: ReservationStatus = {
    id: 4,
    name: 'Enquiry',
    colorCode: '#433be3',
    qColorCode: 'blue-9'
  }

  static Reserved: ReservationStatus = {
    id: 5,
    name: 'Reserved',
    colorCode: '#ede500',
    qColorCode: 'yellow-6'
  }

  static Renewal: ReservationStatus = {
    id: 6,
    name: 'Renewal',
    colorCode: '#9356d1',
    qColorCode: 'deep-purple-7'
  }

  static getAllStatuses = (): ReservationStatus[] => {
    const properties = Object.getOwnPropertyNames(ReservationStatuses).filter(p => p.charAt(0) === p.charAt(0).toUpperCase())
    return properties.map(p => ReservationStatuses[p as keyof ReservationStatuses])
  }

  static getStatusbyId = (id?: number): ReservationStatus | undefined =>
    ReservationStatuses.getAllStatuses().find(s => s.id === id)

  static getStatusbyStatusName = (statusName?: string): ReservationStatus | undefined =>
    ReservationStatuses.getAllStatuses().find(s => s.name === statusName)
}
