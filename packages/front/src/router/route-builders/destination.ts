import { OptionalExceptFor } from '@/shared/src/misc/type-helpers'

import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { getRouteURL } from '@/front/src/router/transformers/_helpers'
import { DecodedParameters } from '@/front/src/router/transformers/_types'
import { destinationTransformer } from '@/front/src/router/transformers/destination'

export const destinationParameterTransformers = {
  destinationSlug: destinationTransformer,
  ...originParameterTransformers,
}

export function getDestinationRouteURL(
  customParameters: OptionalExceptFor<
    DecodedParameters<typeof destinationParameterTransformers>,
    'destinationSlug'
  >,
): string {
  return getRouteURL(
    'destination',
    destinationParameterTransformers,
    customParameters,
  )
}
