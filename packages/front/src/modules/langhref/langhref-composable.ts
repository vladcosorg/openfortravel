import { onServerPrefetch, ref, Ref } from '@vue/composition-api'

import { generateHreflangTags } from '@/front/src/modules/langhref/langhref'

export function useMeta(): Ref {
  const meta = ref({})
  onServerPrefetch(async () => {
    meta.value = {
      link: await generateHreflangTags(),
    }
  })

  return meta
}
