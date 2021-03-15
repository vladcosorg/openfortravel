import { Question } from '@/front/src/pages/destination/questions/question'
import { StateClass } from '@/front/src/pages/destination/store/state'
import { SummaryItem } from '@/front/src/pages/destination/summary-items/summary-item'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction, RestrictionCollection } from '@/shared/src/api/restrictions/models'
import { GetterContext } from '@/shared/src/misc/augmented-store'

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
}
