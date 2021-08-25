import { RoundTripCard } from '@/front/src/models/round-trip-card'
import { Question } from '@/front/src/pages/destination/questions/question'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { Destination } from '@/shared/src/api/destinations/models'
import type { GetterContext } from '@/shared/src/misc/augmented-store'
import { CountryFactsheet } from '@/shared/src/models/country-factsheet/country-factsheet'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'

type LocalGetterContext<
  State = StateClass,
  Accessors = {
    [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]>
  },
> = GetterContext<State, Accessors>

export type GetterSignatures = {
  currentOriginCode(...args: LocalGetterContext): string
  currentDestinationCode(...args: LocalGetterContext): string
  origin(...args: LocalGetterContext): Destination
  destination(...args: LocalGetterContext): Destination
  outgoingRestrictions(...args: LocalGetterContext): RestrictionGroupCollection
  returnRestrictions(...args: LocalGetterContext): RestrictionGroupCollection
  tripCard(...args: LocalGetterContext): RoundTripCard
  questions(...args: LocalGetterContext): Question[]
  restrictionsLoading(...args: LocalGetterContext): boolean
  originFactsheet(...args: LocalGetterContext): CountryFactsheet
  destinationFactsheet(...args: LocalGetterContext): CountryFactsheet
}
