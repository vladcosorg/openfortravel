import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'
import omit from 'lodash/omit'
import { useKy } from '@/shared/src/composables/use-plugins'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'

export type OneWayOverview = {
  quarantine: boolean
  pcrTest: boolean
  rating: number
  status: RestrictionStatus
}
export type RoundTripOverview = {
  outgoing: OneWayOverview
  return: OneWayOverview
}
export type RoundTripOverviewCollection = Record<string, RoundTripOverview>

export async function fetchOverview(
  context: VisitorProfile,
): Promise<RoundTripOverviewCollection> {
  const searchParams = omit(context, 'origin') as any
  return await useKy()
    .get(
      `${process.env.CLOUD_FUNCTIONS_URL}/api/restrictions/${context.origin}/overview`,
      { searchParams },
    )
    .json()
}
