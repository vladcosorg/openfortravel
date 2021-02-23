import { ref, Ref } from '@vue/composition-api'

import {
  generateRestrictionListByDestination,
  sortByOrigin,
  wrapCollectionWithRichObject,
} from '@/shared/src/api/restrictions/helper'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useAsyncState } from '@/shared/src/composables/use-async'

export function useRestrictionListFilteredByDestination(
  destinationCode: string,
): {
  list: Ref<Restriction[]>
  loading: Ref<boolean>
} {
  const promise = generateRestrictionListByDestination(destinationCode)
  const list = ref<Restriction[]>([])
  const { loading } = useAsyncState(promise, [])

  void promise.then((restriction) => {
    list.value = sortByOrigin(wrapCollectionWithRichObject(restriction))
  })

  return {
    loading,
    list,
  }
}
