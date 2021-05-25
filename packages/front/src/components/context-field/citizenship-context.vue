<template>
  <country-dropdown
    v-model="value"
    multiple
    label="Citizenship"
    clearable
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/pages/guide/components/country-dropdown.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { CountryDropdown },
  props: {},
  setup() {
    const value = createComputedSetter(RestrictionNodeType.CITIZENSHIP)
    return { value }
  },
})
</script>
