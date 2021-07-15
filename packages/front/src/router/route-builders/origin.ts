import { Route } from 'vue-router'

import {
  getRouteURL,
  parseRoute,
} from '@/front/src/router/transformers/_helpers'
import { DecodedParameters } from '@/front/src/router/transformers/_types'
import { citizenshipTransformer } from '@/front/src/router/transformers/citizenship'
import { localeTransformer } from '@/front/src/router/transformers/locale'
import { originTransformer } from '@/front/src/router/transformers/origin'
import { recentlyVisitedTransformer } from '@/front/src/router/transformers/recently-visited'
import { recoveredTransformer } from '@/front/src/router/transformers/recovered'
import { vaccinatedTransformer } from '@/front/src/router/transformers/vaccinated'

export const originParameterTransformers = {
  locale: localeTransformer,
  originSlug: originTransformer,
  citizenship: citizenshipTransformer,
  vaccinated: vaccinatedTransformer,
  recovered: recoveredTransformer,
  visited: recentlyVisitedTransformer,
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
