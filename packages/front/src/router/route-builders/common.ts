import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'
import { useRouter } from '@/shared/src/composables/use-plugins'

export function updateRouteParameter<
  T extends keyof typeof destinationParameterTransformers,
>(
  field: T,
  value: ReturnType<typeof destinationParameterTransformers[T]['decode']>,
): void {
  useRouter().push({
    params: { [field]: destinationParameterTransformers[field].encode(value) },
  })
}
