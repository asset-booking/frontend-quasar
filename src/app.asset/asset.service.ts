import { calendarApi } from 'src/boot/axios'
import { Asset, AssetSchedule } from './asset.model'

class AssetService {
  private assetEndpoint = '/api/asset'
  private assetScheduleEndpoint = '/api/assetSchedule'

  async getAll (): Promise<Asset[]> {
    const response = await calendarApi.get(`${this.assetEndpoint}/getAll`)
    const data = response.data as Asset[] ?? []

    return data
  }

  async getAssetsSchedules (assets: Asset[], start: Date, end: Date): Promise<AssetSchedule[]> {
    return this.getAssetsSchedulesByIds(assets.map(a => a.id), start, end)
  }

  async getAssetsSchedulesByIds (assetIds: number[], start: Date, end: Date): Promise<AssetSchedule[]> {
    const response = await calendarApi.get(`${this.assetScheduleEndpoint}/getByAssetIds`, {
      params: {
        assetIds,
        start,
        end
      },
      paramsSerializer: {
        indexes: null
      }
    })
    const data = response.data as AssetSchedule[] ?? []

    data.forEach(schedule => {
      if (schedule.reservations) {
        schedule.reservations.forEach(reservation => {
          reservation.start = new Date(reservation.start)
          reservation.end = new Date(reservation.end)
        })
      }
    })
    return data
  }
}

export const assetService = new AssetService()
