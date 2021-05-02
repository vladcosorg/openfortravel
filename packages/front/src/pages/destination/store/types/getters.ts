import type { Question } from '@/front/src/pages/destination/questions/question'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import type { Destination } from '@/shared/src/api/destinations/models'
import type { Restriction, RestrictionCollection } from '@/shared/src/api/restrictions/models'
import type { GetterContext } from '@/shared/src/misc/augmented-store'
import type { EntryWays } from '@/shared/src/restriction-tree/entry-ways'
import type { Matcher } from '@/shared/src/restriction-tree/matcher'
import type { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

type LocalGetterContext<
  State = StateClass,
  Accessors = { [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]> }
> = GetterContext<State, Accessors>

export type GetterSignatures = {
  relatedRestrictionList(...args: LocalGetterContext): RestrictionCollection
  relatedRestrictionForbiddenStringList(...args: LocalGetterContext): string[]

  currentReturnDestination(...args: LocalGetterContext): Destination | undefined
  currentDestination(...args: LocalGetterContext): Destination | undefined

  returnRestriction(...args: LocalGetterContext): Restriction | undefined
  currentRestriction(...args: LocalGetterContext): Restriction | undefined

  questions(...args: LocalGetterContext): Question[]
  getQuestionByType(...args: LocalGetterContext): (questionClass: typeof Question) => Question

  summaryItems(...args: LocalGetterContext): SummaryItem[]

  restrictionGroups(...args: LocalGetterContext): Matcher
  entryWays(...args: LocalGetterContext): EntryWays
  visitorContext(...args: LocalGetterContext): VisitorContext
}
