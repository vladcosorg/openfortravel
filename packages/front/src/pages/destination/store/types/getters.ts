import type { Question } from '@/front/src/pages/destination/questions/question'
import type { StateClass } from '@/front/src/pages/destination/store/state'
import type { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import type { Destination } from '@/shared/src/api/destinations/models'
import type { Restriction } from '@/shared/src/api/restrictions/models'
import type { GetterContext } from '@/shared/src/misc/augmented-store'
import type { EntryWays } from '@/shared/src/restriction-tree/entry-ways'

type LocalGetterContext<
  State = StateClass,
  Accessors = { [P in keyof GetterSignatures]: ReturnType<GetterSignatures[P]> }
> = GetterContext<State, Accessors>

export type GetterSignatures = {
  currentReturnDestination(...args: LocalGetterContext): Destination | undefined
  currentDestination(...args: LocalGetterContext): Destination | undefined

  returnRestriction(...args: LocalGetterContext): Restriction | undefined
  currentRestriction(...args: LocalGetterContext): Restriction | undefined

  questions(...args: LocalGetterContext): Question[]
  getQuestionByType(
    ...args: LocalGetterContext
  ): (questionClass: typeof Question) => Question

  summaryItems(...args: LocalGetterContext): SummaryItem[]

  entryWays(...args: LocalGetterContext): EntryWays
}
