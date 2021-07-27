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
    (outputParameters, [parameterName, parameterTransformer]) => {
      const parameterValue =
        parameterName in customParameters
          ? parameterTransformer.encode(customParameters[parameterName])
          : (routeParams[parameterName as string] as string) ??
            parameterTransformer.encode(
              parameterTransformer.contextField
                ? store.state.visitorContext[parameterTransformer.contextField]
                : undefined,
            )

      if (parameterValue === undefined) {
        return outputParameters
      }

      if (parameterTransformer.matcher !== undefined) {
        Array.isArray(outputParameters['parts'])
          ? outputParameters['parts'].push(parameterValue)
          : (outputParameters['parts'] = [parameterValue])
      } else {
        outputParameters[parameterName] = parameterValue
      }

      return outputParameters
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
      const result = parameterTransformer.decode(
        params[parameterName] as string,
      )

      if (result) {
        acc[parameterName] = result
      }

      return acc
    },
    {} as DecodedParameters<T>,
  )
}
