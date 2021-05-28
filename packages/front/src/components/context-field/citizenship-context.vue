<template>
  <country-dropdown
    v-model="value"
    multiple
    label="Citizenship"
    clearable
    v-bind="$attrs"
    bottom-slots
  >
    <template #hint>
      <hint>
        Most of the countries apply restrictions based on a citizenship.
      </hint>
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Hint, CountryDropdown },
  inheritAttrs: false,
  props: {},
  setup() {
    const value = createComputedSetter(RestrictionNodeType.CITIZENSHIP)
    return { value }
  },
})
</script>
