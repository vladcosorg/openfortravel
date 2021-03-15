import { RootStateType } from '@/front/src/store/state'
import { Destination, MappedDestinationCollection } from '@/shared/src/api/destinations/models'
import { MappedRestrictionCollection } from '@/shared/src/api/restrictions/models'
import { GetterContext } from '@/shared/src/misc/augmented-store'

type LocalGetterContext<
  State = RootStateType,
  Accessors = RootGetterAccessors
> = GetterContext<State, Accessors>

export interface GetterSignatures {
  wrappedHostRules(...args: LocalGetterContext): MappedDestinationCollection
  sharedRestrictions(...args: LocalGetterContext): MappedRestrictionCollection

  currentOrigin(...args: LocalGetterContext): Destination
  detectedCountryWithFallback(...args: LocalGetterContext): string
}

export type RootGetterAccessors = {
  [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]>
}
