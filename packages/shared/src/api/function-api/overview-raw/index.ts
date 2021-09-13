import omit from 'lodash/omit'
import { stringify } from 'qs'

import { isServer } from '@/front/src/misc/misc'
import { serverCache } from '@/front/src/misc/server-cache'
import { createRawOverviewCollection } from '@/shared/src/api/function-api/overview-raw/helpers'
import { RoundTripEncodedRestriction } from '@/shared/src/api/function-api/overview-raw/model'
import { useKy } from '@/shared/src/composables/use-plugins'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'

export async function fetchRawOverview(
  context: ProfileContext,
): Promise<Record<string, RoundTripEncodedRestriction>> {
  return isServer()
    ? await fetchFromServerCache(context)
    : await fetchFromRemoteEndpoint(context)
}

function fetchFromServerCache(
  context: ProfileContext,
): Record<string, RoundTripEncodedRestriction> {
  return createRawOverviewCollection(context, serverCache.destinations!)
}

async function fetchFromRemoteEndpoint(
  context: ProfileContext,
): Promise<Record<string, RoundTripEncodedRestriction>> {
  const searchParams = omit(context, 'origin') as any
  return await useKy()
    .get(
      `${process.env.CLOUD_FUNCTIONS_URL}/api/restrictions/${context.origin}/raw-overview`,
      {
        searchParams: stringify({
          context: searchParams,
        }),
      },
    )
    .json()
}
