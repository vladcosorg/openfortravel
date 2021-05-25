import type { Ref } from '@vue/composition-api'
import { onServerPrefetch, ref } from '@vue/composition-api'

export function useMeta(): Ref {
  const meta = ref({})
  onServerPrefetch(async () => {
    const { generateHreflangTags } = await import(
      /* webpackChunkName: "langhref" */
      '@/front/src/modules/langhref/langhref'
    )
    meta.value = {
      link: await generateHreflangTags(),
    }
  })

  return meta
}
