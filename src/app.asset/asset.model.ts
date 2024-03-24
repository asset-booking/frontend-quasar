export interface Asset {
  id: number
  categoryReference: string
  specification: string
  specificationIcons: string[]
  note: string
  noteIcons: string[]
}

export interface AssetSchedule {
  assetId: number
  scheduleId: number
  reservations?: AssetReservation[]
}

export interface AssetReservation {
  id: string
  statusId: number
  start: Date
  end: Date
  total: number
  coordinatorPhoneNumber: string
  moderatorName: string
}

export interface AssetOption {
  id: number
  categoryReferenceWithSpec: string
  disabled: boolean
}