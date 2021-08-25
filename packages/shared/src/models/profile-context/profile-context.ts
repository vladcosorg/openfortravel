import { typeConstructors } from '@/shared/src/restriction-tree/converter'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>
type MatcherTypes = {
  [key in RestrictionNodeType]: Parameters<
    InstanceType<typeof typeConstructors[key]>['matches']
  >[0]
}
export type ProfileContext = OptionalExceptFor<
  MatcherTypes,
  | RestrictionNodeType.ORIGIN
  | RestrictionNodeType.CITIZENSHIP
  | RestrictionNodeType.DID_NOT_VISIT_COUNTRIES
>
