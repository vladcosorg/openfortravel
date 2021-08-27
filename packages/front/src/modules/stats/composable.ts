import { useTransition } from '@vueuse/core'
import { computed, ComputedRef, onMounted, ref, Ref, watch } from 'vue'

import {
  statCategory,
  StatCategory,
  TripsGroupedByStatCategory,
} from '@/front/src/modules/stats/model'

export function useStatCollection(
  groupedTrips: Ref<TripsGroupedByStatCategory>,
): ComputedRef<
  Array<{
    type: StatCategory
    count: number | undefined
  }>
> {
  return computed(() =>
    statCategory.map((category) => ({
      type: category,
      count: groupedTrips.value[category]?.length,
    })),
  )
}

export function useStatCountTransition(count: Ref<number | undefined>): {
  count: ComputedRef<number>
} {
  const internalCount = ref(0)
  watch(count, (newCount) => {
    internalCount.value = 0
    if (newCount) {
      internalCount.value = newCount
    }
  })

  onMounted(() => (internalCount.value = count.value ?? 0))

  const animatedCount = useTransition(internalCount, {
    duration: 1500,
    transition: [0.75, 0, 0.25, 1],
  })

  return { count: animatedCount }
}
