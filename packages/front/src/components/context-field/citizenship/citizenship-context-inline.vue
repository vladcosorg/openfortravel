<template>
  <country-dropdown
    v-model="value"
    borderless
    behavior="dialog"
    inherit-font-size
    multiple
    inline
    no-ellipsis
    dense
  >
    <template #selected>
      <country-label-list regular :values="value" />
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { updateRouteParameter } from '@/front/src/router/route-builders/common'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeTypeValue } from '@/shared/src/restriction-tree/matcher'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    CountryLabelList,
    CountryDropdown,
  },
  inheritAttrs: false,
  setup() {
    const store = useRootStore()
    const value = computed<
      RestrictionNodeTypeValue<RestrictionNodeType.CITIZENSHIP>
    >({
      get() {
        return store.getters.visitorContextWithDefaults[
          RestrictionNodeType.CITIZENSHIP
        ]
      },
      set(value) {
        updateRouteParameter(RestrictionNodeType.CITIZENSHIP, value)
      },
    })
    return { value }
  },
})
</script>
