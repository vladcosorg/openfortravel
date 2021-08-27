import { RoundTripCollection } from '@/shared/src/models/trip/round-trip'

export const statCategory = ['open', 'test', 'quarantine', 'forbidden'] as const
export type StatCategory = typeof statCategory[number]
export type TripsGroupedByStatCategory = {
  [key in StatCategory]: RoundTripCollection | undefined
}

export const statColor: Record<StatCategory, string> = {
  open: 'positive',
  test: 'info',
  quarantine: 'warning',
  forbidden: 'negative',
}
