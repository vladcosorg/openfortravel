<template>
  <span v-if="hasIntersection">
    <country-label-list :values="focusedIntersection" focused />
    <span v-if="allowedCountriesCount > 0">
      or one of the matching
      {{ allowedCountriesCount }} countries
    </span>
  </span>
  <span v-else>
    one of the {{ allowedCountriesCount }} matching countries
    (<country-label-list :values="focus" />
    is not one of them)
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent } from '@vue/composition-api'
import intersection from 'lodash/intersection'

import CountryLabelList from '@/front/src/components/country/country-label-list.vue'

export default defineComponent({
  components: { CountryLabelList },
  props: {
    allowed: {
      type: Array as PropType<string[]>,
      required: true,
    },
    focus: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
  },
  setup(props) {
    const focusedArray = computed(() =>
      Array.isArray(props.focus) ? props.focus : [props.focus],
    )
    const focusedIntersection = computed(() =>
      intersection(focusedArray.value, props.allowed),
    )

    const hasIntersection = computed(() => focusedIntersection.value.length > 0)

    const allowedCountriesCount = computed(() =>
      hasIntersection.value
        ? props.allowed.length - focusedIntersection.value.length
        : props.allowed.length,
    )

    return {
      hasIntersection,
      focusedIntersection,
      allowedCountriesCount,
    }
  },
})
</script>
