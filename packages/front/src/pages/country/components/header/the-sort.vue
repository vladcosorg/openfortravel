<template>
  <generic-select
    v-model="model"
    label="Sort by"
    :options="options"
    :use-input="false"
    :loading="isBuffering"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import { useDelayedSetter } from '@/front/src/composables/misc'
import {
  SearchSortOption,
  sorters,
  useCountryStore,
} from '@/front/src/pages/country/pinia-store'

const store = useCountryStore()
const { model, isBuffering } = useDelayedSetter(
  computed({
    get() {
      return store.sortBy
    },
    set(value: SearchSortOption) {
      store.sortBy = value
    },
  }),
)
const options = computed(() =>
  Object.keys(sorters).map((value) => {
    let label = ''
    switch (value) {
      case 'risk':
        label = 'Infection risk'
        break

      case 'alphabet':
        label = 'A-Z'
        break
      default:
        label = value
    }

    return {
      label,
      value,
    }
  }),
)
</script>
