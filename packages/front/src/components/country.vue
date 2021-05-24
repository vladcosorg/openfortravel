<template>
  <span :class="{ 'text-bold': !regular, 'text-accent': focused }">{{
    country
  }}</span>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import {
  getDestinationLabelForCountryCode,
  getLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

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
    declination: {
      type: String as PropType<'origin' | 'destination' | 'nominative'>,
      default: 'origin',
    },
  },
  setup(props) {
    const country = computed(() => {
      if (props.declination === 'origin') {
        return getOriginLabelForCountryCode(props.code)
      } else if (props.declination === 'destination') {
        return getDestinationLabelForCountryCode(props.code)
      } else if (props.declination === 'nominative') {
        return getLabelForCountryCode(props.code)
      }

      throw new Error('Undefined type')
    })

    return { country }
  },
})
</script>
