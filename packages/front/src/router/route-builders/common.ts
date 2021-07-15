import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'
import { originParameterTransformers } from '@/front/src/router/route-builders/origin'
import { encodeParameters } from '@/front/src/router/transformers/_helpers'
import { useRouter } from '@/shared/src/composables/use-plugins'

export function updateRouteParameter<
  T extends keyof typeof destinationParameterTransformers,
>(
  field: T,
  value: ReturnType<typeof destinationParameterTransformers[T]['decode']>,
): void {
  const router = useRouter()
  const currentRoute = router.currentRoute

  useRouter().push({
    params: encodeParameters(
      currentRoute.name === 'destination'
        ? destinationParameterTransformers
        : originParameterTransformers,
      {
        [field]: value,
      },
    ),
  })
}
