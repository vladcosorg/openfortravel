<template>
  <span :class="{ 'text-bold': !regular, 'text-accent': focused }">{{
    country
  }}</span>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {},
  props: {
    code: {
      type: String,
      required: true,
    },
    regular: {
      type: Boolean,
      default: false,
    },
    focused: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const country = computed(() => getLabelForCountryCode(props.code))

    return { country }
  },
})
</script>
