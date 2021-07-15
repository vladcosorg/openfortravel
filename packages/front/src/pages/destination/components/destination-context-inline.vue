<template>
  <country-dropdown
    v-model="model"
    borderless
    behavior="dialog"
    inherit-font-size
    inline
    no-ellipsis
    dense
  >
    <template #selected>
      <country-label regular focused :value="model" />
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { updateRouteParameter } from '@/front/src/router/route-builders/common'

export default defineComponent({
  components: {
    CountryLabel,
    CountryDropdown,
  },
  inheritAttrs: false,
  setup() {
    const store = inject(StoreKey) as StoreModule
    const model = computed({
      get() {
        return store.state.currentDestinationCode
      },
      set(destinationCode: string) {
        updateRouteParameter('destinationSlug', destinationCode)
      },
    })

    return { model }
  },
})
</script>
