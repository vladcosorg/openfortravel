<template>
  <inline-select v-model="model" :options="options">
    <template #inline-label>
      <country-label-list regular :values="model" />
    </template>
  </inline-select>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import InlineSelect from '@/front/src/components/context-field/helpers/inline-select.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { useCountryOptions } from '@/front/src/composables/misc'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { updateRouteParameter } from '@/front/src/router/route-builders/common'

export default defineComponent({
  components: {
    CountryLabelList,
    InlineSelect,
  },
  inheritAttrs: false,
  setup() {
    const store = inject(StoreKey) as StoreModule
    const options = useCountryOptions()
    const model = computed({
      get() {
        return store.getters.currentDestinationCode
      },
      set(destinationCode: string) {
        updateRouteParameter('destinationSlug', destinationCode)
      },
    })

    return { model, options }
  },
})
</script>
