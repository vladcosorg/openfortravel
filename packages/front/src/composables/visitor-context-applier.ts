import { useRootStore } from '@/shared/src/composables/use-plugins'
import { Entries } from '@/shared/src/misc/type-helpers'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { parseRoute } from '@/front/src/router/transformers/_helpers'
import { ParameterTransformerMap } from '@/front/src/router/transformers/_types'

export function applyContextFromProps(props: Record<string, any>): void {
  useRootStore().mutations.replaceVisitorContext({
    context: Object.entries(originParameterTransformers).reduce(
      (context, [parameterName, parameterTransformer]) => {
        if (
          parameterTransformer.contextField &&
          props[parameterName] !== undefined
        ) {
          context[parameterTransformer.contextField] = props[parameterName]
        }

        return context
      },
      {},
    ),
  })
}

export function parseContext(
  route: ReturnType<typeof useRoute>,
  config: ParameterTransformerMap,
): void {
  const partParams = matchWithParts(route.params, config)
  const params = parseRoute(partParams, config)
  useRootStore().mutations.setSlugs(params)
  applyContextFromProps(params)
}

export function useContextParser(config: ParameterTransformerMap): void {
  parseContext(useRoute(), config)
  onBeforeRouteUpdate((to) => {
    parseContext(to, config)
  })
}

function matchWithParts(
  routeParams: ReturnType<typeof useRoute>['params'],
  transformers: ParameterTransformerMap,
) {
  const params = { ...routeParams }
  const parts = params.parts

  if (!Array.isArray(parts)) {
    return params
  }

  for (const [name, transformer] of Object.entries(
    transformers,
  ) as Entries<ParameterTransformerMap>) {
    if (!transformer.matcher) {
      continue
    }

    const matcher = transformer.matcher
    const match = parts.find((slug) => matcher(slug))

    if (!match) {
      continue
    }

    params[name] = match
  }

  return params
}
