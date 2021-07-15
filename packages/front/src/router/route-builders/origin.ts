import { Route } from 'vue-router'

import {
  getRouteURL,
  parseRoute,
} from '@/front/src/router/transformers/_helpers'
import { DecodedParameters } from '@/front/src/router/transformers/_types'
import { citizenshipTransformer } from '@/front/src/router/transformers/citizenship'
import { localeTransformer } from '@/front/src/router/transformers/locale'
import { originTransformer } from '@/front/src/router/transformers/origin'
import { vaccinatedTransformer } from '@/front/src/router/transformers/vaccinated'

export const originParameterTransformers = {
  locale: localeTransformer,
  originSlug: originTransformer,
  citizenship: citizenshipTransformer,
  vaccinated: vaccinatedTransformer,
}

export function getOriginRouteURL(
  customParameters?: DecodedParameters<typeof originParameterTransformers>,
): string {
  return getRouteURL('origin', originParameterTransformers, customParameters)
}

export function parseOriginRoute(
  route: Route,
): DecodedParameters<typeof originParameterTransformers> {
  if (route.name !== 'origin') {
    throw new Error('Incorrect route parser')
  }

  return parseRoute(route, originParameterTransformers)
}
