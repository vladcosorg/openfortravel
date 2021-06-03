import type { Ref } from '@vue/composition-api'
import { computed, ref } from '@vue/composition-api'

import { useLoading } from '@/shared/src/composables/use-promise-loading'

export type SaveHandler = () => Promise<void>
export type AddSaveHandler = (handler: SaveHandler) => void

export function useSaveHandler(): {
  isSaving: Ref<boolean>
  isPending: Ref<boolean>
  addSaveHandlerProp: AddSaveHandler
  runPendings: () => Promise<void>
} {
  const pendingOperations = ref<SaveHandler[]>([])
  const { loading: isSaving } = useLoading()
  const isPending = computed(() => pendingOperations.value.length > 0)

  return {
    isSaving,
    isPending,
    addSaveHandlerProp(handler) {
      pendingOperations.value.push(handler)
    },
    async runPendings() {
      isSaving.value = true
      await Promise.all(pendingOperations.value.map((callback) => callback()))
      pendingOperations.value = []
      isSaving.value = false
    },
  }
}
