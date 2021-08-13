import { onServerPrefetch, ref } from 'vue'

import type { Ref } from 'vue'

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
