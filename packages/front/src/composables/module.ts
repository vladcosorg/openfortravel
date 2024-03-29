import { onMounted, onUnmounted } from 'vue'

import { useStore } from '@/shared/src/composables/use-plugins'

import type { Module } from 'vuex'

export function useModule(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeModule: Module<any, any>,
): void {
  const store = useStore()
  const registerModule = (): void => {
    if (!store.hasModule(id)) {
      const preserveState = !!useStore().state[id]

      useStore().registerModule(id, storeModule, {
        preserveState,
      })
    }
  }

  registerModule()

  if (process.env.DEV) {
    onMounted(() => {
      registerModule()
    })
  }

  onUnmounted(() => {
    useStore().unregisterModule(id)
  })
}
