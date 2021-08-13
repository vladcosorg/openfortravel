<template>
  <inline-select v-model="model" :options="options">
    <template #inline-label>
      <country-label-list regular :values="model" />
    </template>
  </inline-select>
</template>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { computed, defineComponent } from 'vue'

import InlineSelect from '@/front/src/components/context-field/helpers/inline-select.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { useCountryOptions } from '@/front/src/composables/misc'
import { updateRouteParameter } from '@/front/src/router/route-builders/common'

export default defineComponent({
  components: {
    InlineSelect,
    CountryLabelList,
  },
  inheritAttrs: false,
  setup() {
    const options = useCountryOptions()
    const model = computed<string>({
      get() {
        return useRootStore().getters.visitorContextWithDefaults[
          RestrictionNodeType.ORIGIN
        ]
      },
      set(originCode) {
        updateRouteParameter('originSlug', originCode)
      },
    })

    return { model, options }
  },
})
</script>
