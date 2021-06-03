<template>
  <span
    ><country-label
      v-for="(value, key) in list"
      v-bind="$props"
      :key="key"
      :value="value"
  /></span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import { withProps } from '@/front/src/components/country/composables'
import CountryLabel from '@/front/src/components/country/country-label.vue'

export default defineComponent({
  components: { CountryLabel },
  props: {
    ...withProps,
    values: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
  },
  setup(props) {
    const list = computed(() =>
      Array.isArray(props.values) ? props.values : [props.values],
    )
    return { list }
  },
})
</script>
