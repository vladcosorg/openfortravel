import { Route } from 'vue-router'

import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import {
  getRouteURL,
  parseRoute,
} from '@/front/src/router/transformers/_helpers'
import { DecodedParameters } from '@/front/src/router/transformers/_types'
import { destinationTransformer } from '@/front/src/router/transformers/destination'

export const destinationParameterTransformers = Object.assign(
  { destinationSlug: destinationTransformer },
  originParameterTransformers,
)

export function getDestinationRouteURL(
  customParameters: DecodedParameters<typeof destinationParameterTransformers>,
): string {
  return getRouteURL(
    'destination',
    destinationParameterTransformers,
    customParameters,
  )
}

export function parseDestinationRoute(
  route: Route,
): DecodedParameters<typeof destinationParameterTransformers> {
  if (route.name !== 'destination') {
    throw new Error('Incorrect route parser')
  }

  return parseRoute(route, destinationParameterTransformers)
}
