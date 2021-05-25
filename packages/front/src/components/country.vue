<template>
  <span :class="{ 'text-bold': !regular, 'text-accent': focused }"
    >{{ prefix }}{{ labels ? labels : country }}</span
  >
</template>

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
      type: [String, Array] as PropType<string | string[]>,
    },
    label: {
      type: [String, Array] as PropType<string | string[]>,
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
    prefix: {
      type: String,
    },
  },
  setup(props) {
    const countryISOArray = computed(() =>
      Array.isArray(props.code) ? props.code : [props.code],
    )

    const labels = computed(() => {
      if (!props.label) {
        return
      }

      if (!Array.isArray(props.label)) {
        return props.label
      }

      return props.label.join(', ')
    })

    const country = computed(() =>
      countryISOArray.value
        .map((countryISO) => getLabel(countryISO))
        .join(', '),
    )

    const getLabel = (countryISO: string) => {
      switch (props.declination) {
        case 'origin': {
          return getOriginLabelForCountryCode(countryISO)
        }
        case 'destination': {
          return getDestinationLabelForCountryCode(countryISO)
        }
        case 'nominative': {
          return getLabelForCountryCode(countryISO)
        }
        // No default
      }

      throw new Error('Undefined type')
    }

    return { country, labels }
  },
})
</script>
