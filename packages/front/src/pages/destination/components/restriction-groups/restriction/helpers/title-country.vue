<template>
  <span v-if="hasIntersection">
    <country focused :code="focusedIntersection" />
    <span v-if="allowedCountriesCount > 0">
      or one following
      {{ allowedCountriesCount }} countries
    </span>
  </span>
  <span v-else>
    one of the {{ allowedCountriesCount }} allowed countries (<country
      :code="focus"
    />
    is not one of them)
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent } from '@vue/composition-api'
import intersection from 'lodash/intersection'

import Country from '@/front/src/components/country.vue'

export default defineComponent({
  components: { Country },
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
