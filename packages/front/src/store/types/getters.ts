import type { RootStateType } from '@/front/src/store/state'
import type {
  Destination,
  MappedDestinationCollection,
} from '@/shared/src/api/destinations/models'
import type { GetterContext } from '@/shared/src/misc/augmented-store'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

type LocalGetterContext<
  State = RootStateType,
  Accessors = RootGetterAccessors,
> = GetterContext<State, Accessors>

export interface GetterSignatures {
  wrappedHostRules(...args: LocalGetterContext): MappedDestinationCollection

  currentOrigin(...args: LocalGetterContext): Destination
  detectedCountryWithFallback(...args: LocalGetterContext): string

  visitorOrigin(...args: LocalGetterContext): string
  visitorContextWithDefaults(...args: LocalGetterContext): VisitorProfile
}

export type RootGetterAccessors = {
  [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]>
}
