import { TripCard } from '@/front/src/models/TripCard'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { Destination } from '@/shared/src/api/destinations/models'
import type { GetterContext } from '@/shared/src/misc/augmented-store'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'

type LocalGetterContext<
  State = StateClass,
  Accessors = {
    [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]>
  },
> = GetterContext<State, Accessors>

export type GetterSignatures = {
  origin(...args: LocalGetterContext): Destination
  destination(...args: LocalGetterContext): Destination
  outgoingRestrictions(...args: LocalGetterContext): RestrictionGroupCollection
  returnRestrictions(...args: LocalGetterContext): RestrictionGroupCollection
  returnTripCard(...args: LocalGetterContext): TripCard
}
