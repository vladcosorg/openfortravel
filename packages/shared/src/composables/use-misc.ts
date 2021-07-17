import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import { useDebounce } from '@vueuse/core'

export function useFilterableCollection<T>(
  collection: Ref<T>,
  filterCallback: (collection: T, filterValue: string) => T,
): {
  filter: Ref<string>
  collection: Ref<T>
  loading: Ref<boolean>
  isFiltering: ComputedRef<boolean>
} {
  const filter = ref('')

  const debouncedFilter = useDebounce(filter, 500)
  const isFiltering = computed(() => debouncedFilter.value.length > 0)
  const loading = computed(() => filter.value !== debouncedFilter.value)

  const filteredCollection = computed(() => {
    if (isFiltering.value) {
      return filterCallback(collection.value, filter.value.toLowerCase())
    }

    return collection.value
  })

  return {
    loading,
    filter,
    isFiltering,
    collection: filteredCollection,
  }
}
