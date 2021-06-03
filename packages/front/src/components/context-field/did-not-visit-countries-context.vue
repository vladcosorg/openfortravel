<template>
  <country-dropdown
    v-model="value"
    multiple
    label="Recently visited countries"
    clearable
    v-bind="$attrs"
    bottom-slots
  >
    <template #hint>
      <hint>
        Some countries may improse additional restrictions upon you in case
        you've been to a high-risk country recently. Forewarned is forearmed!
      </hint>
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Hint, CountryDropdown },
  inheritAttrs: false,
  props: {},
  setup() {
    const setter = createComputedSetter(
      RestrictionNodeType.DID_NOT_VISIT_COUNTRIES,
    )
    const value = computed({
      get() {
        return setter.value
      },
      set(value: string[] | null) {
        setter.value = value ?? []
      },
    })
    return { value }
  },
})
</script>
