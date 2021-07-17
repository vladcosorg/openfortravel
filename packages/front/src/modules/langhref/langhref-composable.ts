import type { Ref } from 'vue'
import { onServerPrefetch, ref } from 'vue'

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
