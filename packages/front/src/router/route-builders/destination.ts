import { Router } from 'vue-router'

import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { getRouteURL } from '@/front/src/router/transformers/_helpers'
import { DecodedParameters } from '@/front/src/router/transformers/_types'
import { destinationTransformer } from '@/front/src/router/transformers/destination'
import { useRouter } from '@/shared/src/composables/use-plugins'
import { OptionalExceptFor } from '@/shared/src/misc/type-helpers'

export const destinationParameterTransformers = {
  destinationSlug: destinationTransformer,
  ...originParameterTransformers,
}

type RouteParameteres = OptionalExceptFor<
  DecodedParameters<typeof destinationParameterTransformers>,
  'destinationSlug'
>

export function getDestinationRouteURL(
  customParameters: RouteParameteres,
): string {
  return getRouteURL(
    'destination',
    destinationParameterTransformers,
    customParameters,
  )
}

export function goToDestination(
  parameters: RouteParameteres,
): ReturnType<Router['push']> {
  return useRouter().push(getDestinationRouteURL(parameters))
}
