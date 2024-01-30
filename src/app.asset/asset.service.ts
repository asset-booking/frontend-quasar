import { IApiService } from 'src/app.common/api.service'
import { calendarApi } from 'src/boot/axios'
import { AssetDto } from './asset.dto'
import { assetFactory } from './asset.factory'
import { Asset } from './asset.model'

class AssetService implements IApiService<Asset> {
  create (item: Asset): Promise<Asset> {
    throw new Error('Method not implemented.' + item)
  }

  update (src: Asset, target: Asset): Promise<boolean> {
    throw new Error('Method not implemented.' + src + target)
  }

  delete (item: Asset): Promise<boolean> {
    throw new Error('Method not implemented.' + item)
  }

  deleteById (id: number): Promise<boolean> {
    throw new Error('Method not implemented.' + id)
  }

  getById (id: number): Promise<Asset | undefined> {
    throw new Error('Method not implemented.' + id)
  }

  async getAll (): Promise<Asset[]> {
    const response = await calendarApi.get('/api/reservations')
    const data = response.data as AssetDto[] ?? []
    const result: Asset[] = []
    data.forEach(assetDto => {
      result.push(assetFactory.createFromDto(assetDto))
    })

    return result
  }
}

export const assetService = new AssetService()
