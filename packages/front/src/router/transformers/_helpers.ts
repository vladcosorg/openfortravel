import {
  DecodedParameters,
  EncodedParameters,
  ParameterTransformerMap,
} from '@/front/src/router/transformers/_types'
import {
  useRootStore,
  useRouter,
  useRoute,
} from '@/shared/src/composables/use-plugins'
import { Entries } from '@/shared/src/misc/type-helpers'
import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'

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
  const routeParams = useRoute().params
  const store = useRootStore()
  return (Object.entries(transformationConfig) as Entries<T>).reduce(
    (acc, [parameterName, parameterTransformer]) => {
      if (customParameters.hasOwnProperty(parameterName)) {
        acc[parameterName] = parameterTransformer.encode(
          customParameters[parameterName],
        )
      } else {
        const val =
          routeParams[parameterName] ??
          parameterTransformer.encode(
            store.state.visitorContext[parameterTransformer.contextField],
          )

        if (val !== undefined) {
          acc[parameterName] = val
        }
      }
      return acc
    },
    {} as EncodedParameters<T>,
  )
}

export function parseRoute<T extends ParameterTransformerMap>(
  params: ReturnType<typeof useRoute>['params'],
  transformationConfig: T,
): DecodedParameters<T> {
  return (Object.entries(transformationConfig) as Entries<T>).reduce(
    (acc, [parameterName, parameterTransformer]) => {
      acc[parameterName] = parameterTransformer.decode(params[parameterName])
      return acc
    },
    {} as DecodedParameters<T>,
  )
}
