import type { Ref } from '@vue/composition-api';
import { computed, ref } from '@vue/composition-api'

import type { Restriction } from '@/shared/src/api/restrictions/models'
import { persistRestrictionCollection } from '@/shared/src/api/restrictions/persisters'
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

export function useRestrictionPersister(
  allRestrictions: Ref<Restriction[]>,
  addSaveHandler: AddSaveHandler,
  selection?: Ref<Restriction[]>,
): {
  persistOne: <K extends keyof Restriction>(
    field: K,
    value: Restriction[K],
    oldRestriction: Restriction,
  ) => void
  persistSelectedOrAll: <K extends keyof Restriction>(field: K, value: Restriction[K]) => void
  flush: () => Promise<void>
} {
  const flushQueue: Set<Restriction> = new Set()
  let isSaveHandlerAdded = false

  const flush = async (): Promise<void> => {
    await persistRestrictionCollection([...flushQueue])
    flushQueue.clear()
    isSaveHandlerAdded = false
  }

  return {
    persistOne(field, value, restriction) {
      restriction[field] = value
      flushQueue.add(restriction)

      if (!isSaveHandlerAdded) {
        addSaveHandler(flush)
        isSaveHandlerAdded = true
      }
    },
    persistSelectedOrAll(field, value) {
      const list = selection?.value.length ? selection : allRestrictions

      for (const restriction of list.value) {
        restriction[field] = value
        flushQueue.add(restriction)
      }

      if (!isSaveHandlerAdded) {
        addSaveHandler(flush)
        isSaveHandlerAdded = true
      }
    },
    flush,
  }
}
