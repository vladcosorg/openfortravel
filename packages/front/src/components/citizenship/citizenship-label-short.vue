<template>
  <span class="text-accent">{{ formattedValue }}</span>
</template>

<script lang="ts">
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Array as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const formattedValue = computed(() => {
      const firstCitizenship = getOriginLabelForCountryCode(props.value[0])

      if (props.value.length === 1) {
        return firstCitizenship
      }

      return `${firstCitizenship} (and ${
        props.value.length - 1
      } more countries)`
    })

    return { formattedValue }
  },
})
</script>
