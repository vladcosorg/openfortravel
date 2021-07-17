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
import { computed, defineComponent } from 'vue'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    CountryLabel,
    CountryDropdown,
  },
  inheritAttrs: false,
  setup() {
    const model = computed({
      get() {
        return useRootStore().getters.visitorContextWithDefaults[
          RestrictionNodeType.ORIGIN
        ]
      },
      set(originCode) {
        updateRouteParameter('originSlug', originCode)
      },
    })

    return { model }
  },
})
</script>
