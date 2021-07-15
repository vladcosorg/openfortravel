import { Route } from 'vue-router'

import {
  DecodedParameters,
  EncodedParameters,
  ParameterTransformerMap,
} from '@/front/src/router/transformers/_types'
import { useRouter } from '@/shared/src/composables/use-plugins'
import { Entries } from '@/shared/src/misc/type-helpers'

export function getRouteURL<T extends ParameterTransformerMap>(
  routeName: string,
  parameterTransformers: T,
  customParameters?: DecodedParameters<T>,
): string {
  return useRouter().resolve({
    name: routeName,
    params: encodeParameters(parameterTransformers, customParameters),
  }).href
}

export function encodeParameters<T extends ParameterTransformerMap>(
  transformationConfig: T,
  customParameters: DecodedParameters<T> = {} as DecodedParameters<T>,
): EncodedParameters<T> {
  const currentRoute = useRouter().currentRoute
  return (Object.entries(transformationConfig) as Entries<T>).reduce(
    (acc, [parameterName, parameterTransformer]) => {
      if (customParameters.hasOwnProperty(parameterName)) {
        acc[parameterName] = parameterTransformer.encode(
          customParameters[parameterName],
        )
      } else {
        acc[parameterName] =
          currentRoute.params[parameterName] ?? parameterTransformer.encode()
      }

      return acc
    },
    {} as EncodedParameters<T>,
  )
}

export function parseRoute<T extends ParameterTransformerMap>(
  route: Route,
  transformationConfig: T,
): DecodedParameters<T> {
  const customParameters = route.params as EncodedParameters<T>
  return (Object.entries(transformationConfig) as Entries<T>).reduce(
    (acc, [parameterName, parameterTransformer]) => {
      acc[parameterName] = parameterTransformer.decode(
        customParameters[parameterName],
      )
      return acc
    },
    {} as DecodedParameters<T>,
  )
}
