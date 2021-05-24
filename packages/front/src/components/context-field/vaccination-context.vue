<template>
  <vaccine-dropdown v-model="value" />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import VaccineDropdown from '@/front/src/pages/guide/components/vaccine-dropdown.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { VaccineDropdown },
  props: {},
  setup() {
    const value = createComputedSetter(RestrictionNodeType.VACCINATED)
    return { value }
  },
})
</script>
