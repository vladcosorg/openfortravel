import { watch } from '@vue/composition-api'

import { useRootStore, useRouter } from '@/shared/src/composables/use-plugins'

export function useSearchIdRouterUpdater() {
  watch(
    () => useRootStore().state.searchId,
    (newVal) => {
      useRouter().push({
        params: { searchId: newVal ?? undefined },
      })
    },
  )
}
