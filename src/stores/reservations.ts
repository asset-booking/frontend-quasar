import { defineStore } from 'pinia'
import { Asset } from 'src/app.asset/asset.model'
import { Reservation } from 'src/app.reservation/reservation.model'
import { ref } from 'vue'

export const useReservationStore = defineStore('reservations', () => {
  const assets = ref<Asset[]>([])

  const getReservationByStartDate = (assetId: number, start: Date): Reservation | undefined => {
    const asset = assets.value.find(a => a.id === assetId)
    if (!asset || !asset.reservations || asset.reservations.length === 0) return

    const result = asset.reservations?.find(({ startDate }) => startDate.getTime() === start.getTime())
    return result as Reservation
  }

  const addReservation = (reservation: Reservation) => {
    const asset = assets.value.find(a => a.id === reservation.assetId)
    if (!asset) return

    if (!asset.reservations) {
      asset.reservations = []
    }

    asset.reservations.push(reservation)
  }

  const updateReservation = (reservation: Reservation) => {
    const asset = assets.value.find(a => a.id === reservation.assetId)
    if (!asset || !asset.reservations || asset.reservations.length === 0) return

    const toUpdate = asset.reservations?.find(({ id }) => id === reservation.id)
    if (!toUpdate) return

    toUpdate.location = reservation.location
    toUpdate.company = reservation.company
    toUpdate.costs = reservation.costs
    toUpdate.statusId = reservation.statusId
    toUpdate.startDate = reservation.startDate
    toUpdate.endDate = reservation.endDate
  }

  const removeReservation = (reservation: Reservation) => {
    const asset = assets.value.find(a => a.id === reservation.assetId)
    if (!asset || !asset.reservations || asset.reservations.length === 0) return

    const toRemove = asset.reservations?.find(({ id }) => id === reservation.id)
    if (toRemove) {
      asset.reservations = asset.reservations.filter(r => r.id !== toRemove.id)
    }
  }

  return {
    assets,
    getReservationByStartDate,
    addReservation,
    updateReservation,
    removeReservation
  }
}, {
  persist: false
})
