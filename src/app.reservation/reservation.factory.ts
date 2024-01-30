import { ReservationCompanyDto } from 'src/app.reservation/reservation.company.dto'
import { ReservationCompany } from 'src/app.reservation/reservation.company.model'
import { ReservationCostDto } from 'src/app.reservation/reservation.cost.dto'
import { ReservationCost } from 'src/app.reservation/reservation.cost.model'
import { ReservationDto } from 'src/app.reservation/reservation.dto'
import { Reservation } from 'src/app.reservation/reservation.model'
import { ReservationStatuses } from 'src/app.reservation/reservation.statuses'
import { addDays } from 'src/utils/dates'

class ReservationCompanyFactory {
  public createDefault (): ReservationCompany {
    return new ReservationCompany()
  }

  public createFrom (src: ReservationCompany): ReservationCompany {
    const result = new ReservationCompany()
    result.name = src?.name
    result.street = src?.street
    result.streetNumber = src?.streetNumber
    result.zipCode = src?.zipCode
    result.city = src?.city
    result.email = src?.email
    result.telephoneNumber = src?.telephoneNumber

    return result
  }

  public createFromDto (src: ReservationCompanyDto | undefined): ReservationCompany {
    if (!src) return this.createDefault()

    const result = new ReservationCompany()
    result.name = src?.name
    result.street = src?.street
    result.streetNumber = src?.streetNumber
    result.zipCode = src?.zipCode
    result.city = src?.city
    result.email = src?.email
    result.telephoneNumber = src?.telephoneNumber

    return result
  }

  public convertToDto (src: ReservationCompany): ReservationCompanyDto {
    const result = new ReservationCompanyDto()
    result.name = src?.name
    result.street = src?.street
    result.streetNumber = src?.streetNumber
    result.zipCode = src?.zipCode
    result.city = src?.city
    result.email = src?.email
    result.telephoneNumber = src?.telephoneNumber

    return result
  }
}

class ReservationCostFactory {
  public createDefault (): ReservationCost {
    return new ReservationCost()
  }

  public createFrom (src: ReservationCost): ReservationCost {
    const result = new ReservationCost(src.serviceFee, src.vat)
    result.pricePerPerson = src.pricePerPerson
    result.numberOfNights = src.numberOfNights

    return result
  }

  public createFromDto (src: ReservationCostDto | undefined): ReservationCost {
    if (!src) return this.createDefault()

    const result = new ReservationCost(src.serviceFeePercentage, src.vatPercentage)
    result.pricePerPerson = src.pricePerPerson * src.numberOfPeople
    result.numberOfNights = src.numberOfNights

    return result
  }

  public convertToDto (src: ReservationCost): ReservationCostDto {
    const result = new ReservationCostDto()
    result.serviceFeePercentage = src.serviceFee
    result.calculatedServiceFee = src.calculatedServiceFee
    result.vatPercentage = src.vat
    result.calculatedVat = src.calculatedVat
    result.numberOfPeople = 1
    result.numberOfNights = src.numberOfNights
    result.pricePerPerson = src.pricePerPerson
    result.total = src.total

    return result
  }
}

class ReservationFactory {
  public createDefault (): Reservation {
    const result = new Reservation()
    result.id = -1
    result.assetId = -1
    result.startDate = new Date(new Date().toDateString())
    result.endDate = addDays(result.startDate, 1)
    result.statusId = ReservationStatuses.Open.id
    result.company = companyFactory.createDefault()
    result.costs = costsFactory.createDefault()
    result.location = ''

    return result
  }

  public createFrom (src: Reservation): Reservation {
    const result = new Reservation(src)
    result.id = -1
    result.assetId = src.assetId
    result.startDate = src.startDate
    result.endDate = src.endDate
    result.statusId = src.statusId
    result.company = companyFactory.createFrom(src.company)
    result.costs = costsFactory.createFrom(src.costs)
    result.location = src.location

    return result
  }

  public createFromDto (src: ReservationDto): Reservation {
    const result = new Reservation()
    result.id = src.id
    result.assetId = src.assetId
    result.startDate = new Date(new Date(src.startDate).toDateString())
    result.endDate = new Date(new Date(src.endDate).toDateString())
    result.statusId = src.statusId
    result.company = companyFactory.createFromDto(src.company)
    result.costs = costsFactory.createFromDto(src.costs)
    result.location = src.location

    return result
  }

  public convertToDto (src: Reservation): ReservationDto {
    const result = new ReservationDto()
    result.id = src.id
    result.assetId = src.assetId
    result.startDate = src.startDate
    result.endDate = src.endDate
    result.statusId = src.statusId
    result.company = companyFactory.convertToDto(src.company)
    result.costs = costsFactory.convertToDto(src.costs)
    result.location = src.location

    return result
  }
}

export const companyFactory = new ReservationCompanyFactory()
export const costsFactory = new ReservationCostFactory()
export const reservationFactory = new ReservationFactory()
