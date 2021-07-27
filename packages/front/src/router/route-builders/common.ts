import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { encodeParameters } from '@/front/src/router/transformers/_helpers'
import { useRouter, useRoute } from '@/shared/src/composables/use-plugins'

export function updateRouteParameter<
  T extends keyof typeof destinationParameterTransformers,
>(
  field: T,
  value: ReturnType<typeof destinationParameterTransformers[T]['decode']>,
): Promise<unknown> {
  return useRouter().push({
    name: useRoute().name,
    params: encodeParameters(
      useRoute().name === 'destination'
        ? destinationParameterTransformers
        : originParameterTransformers,
      {
        [field]: value,
      },
    ),
  })
}
