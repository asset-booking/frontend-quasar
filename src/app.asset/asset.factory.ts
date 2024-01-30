import { AssetDto } from 'src/app.asset/asset.dto'
import { Asset } from 'src/app.asset/asset.model'
import { reservationFactory } from 'src/app.reservation/reservation.factory'

class AssetFactory {
  public createDefault (): Asset {
    const result = new Asset()
    result.id = -1
    result.addressRef = ''

    return result
  }

  public createFrom (src: Asset): Asset {
    const result = new Asset()
    result.id = src.id
    result.addressRef = src.addressRef
    result.notes = src.notes
    result.specs = src.specs
    result.reservations = []

    if (src.reservations) {
      src.reservations.forEach(res => {
        result.reservations!.push(reservationFactory.createFrom(res))
      })
    }

    return result
  }

  public createFromDto (src: AssetDto): Asset {
    const result = new Asset()
    result.id = src.id
    result.addressRef = src.addressRef
    result.notes = src.notes
    result.specs = src.specs
    result.reservations = []

    if (src.reservations) {
      src.reservations.forEach(res => {
        result.reservations!.push(reservationFactory.createFromDto(res))
      })
    }

    return result
  }

  public convertToDto (src: Asset): AssetDto {
    const result = new AssetDto()
    result.id = src.id
    result.addressRef = src.addressRef
    result.notes = src.notes
    result.specs = src.specs
    result.reservations = []

    if (src.reservations) {
      src.reservations.forEach(res => {
        result.reservations!.push(reservationFactory.convertToDto(res))
      })
    }

    return result
  }
}

export const assetFactory = new AssetFactory()
