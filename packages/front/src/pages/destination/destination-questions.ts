import { DestinationObject } from '@/front/src/pages/destination/destination-object'
import { GeneralQuestion } from '@/front/src/pages/destination/questions/general-question'
import { Question } from '@/front/src/pages/destination/questions/question'
import { ReturnQuestion } from '@/front/src/pages/destination/questions/return-question'
import { VisitedCountryQuestion } from '@/front/src/pages/destination/questions/visited-country-question'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export function getQuestions(
  restriction: Restriction,
  destination: Destination,
): Question[] {
  const destinationObject = new DestinationObject(restriction, destination)
  return [GeneralQuestion, VisitedCountryQuestion, ReturnQuestion].map(
    (item) => new item(restriction, destination, destinationObject),
  )
}
