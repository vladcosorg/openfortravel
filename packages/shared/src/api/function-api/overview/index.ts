import omit from 'lodash/omit'
import { stringify } from 'qs'

import { isServer } from '@/front/src/misc/misc'
import { serverCache } from '@/front/src/misc/server-cache'
import { createOverviewCollection } from '@/shared/src/api/function-api/overview/helpers'
import { useKy } from '@/shared/src/composables/use-plugins'
import { RoundTripRawPrecomputedRestrictionMap } from '@/shared/src/models/precomputed-restriction/raw-precomputed-restriction'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'

export async function fetchOverview(
  context: ProfileContext,
): Promise<RoundTripRawPrecomputedRestrictionMap> {
  return isServer()
    ? await fetchFromServerCache(context)
    : await fetchFromRemoteEndpoint(context)
}

function fetchFromServerCache(
  context: ProfileContext,
): RoundTripRawPrecomputedRestrictionMap {
  return createOverviewCollection(context, serverCache.destinations!)
}

async function fetchFromRemoteEndpoint(
  context: ProfileContext,
): Promise<RoundTripRawPrecomputedRestrictionMap> {
  const searchParams = omit(context, 'origin') as any
  return await useKy()
    .get(
      `${process.env.CLOUD_FUNCTIONS_URL}/api/restrictions/${context.origin}/overview`,
      { searchParams: stringify(searchParams) },
    )
    .json()
}
