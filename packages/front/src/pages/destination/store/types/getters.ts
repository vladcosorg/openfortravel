import { RoundTrip } from '@/front/src/models/RoundTrip'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { Destination } from '@/shared/src/api/destinations/models'
import type { GetterContext } from '@/shared/src/misc/augmented-store'
import {
  RestrictionGroup,
  RestrictionGroupCollection,
} from '@/shared/src/restriction-tree/restriction-group'

type LocalGetterContext<
  State = StateClass,
  Accessors = { [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]> }
> = GetterContext<State, Accessors>

export type GetterSignatures = {
  currentReturnDestination(...args: LocalGetterContext): Destination
  currentDestination(...args: LocalGetterContext): Destination

  allGroups(...args: LocalGetterContext): RestrictionGroupCollection
  availableGroups(...args: LocalGetterContext): RestrictionGroup[]
  unavailableGroups(...args: LocalGetterContext): RestrictionGroup[]

  roundTrip(...args: LocalGetterContext): RoundTrip
}
