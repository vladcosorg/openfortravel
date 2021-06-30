<template>
  <seq v-slot="{ item }" :items="list" :conjunction="conjunction"
    ><country-label v-bind="$props" :key="item" :value="item"
  /></seq>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import { withProps } from '@/front/src/components/country/composables'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'

export default defineComponent({
  components: { Seq, CountryLabel },
  props: {
    ...withProps,
    values: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
    conjunction: {
      type: String,
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
