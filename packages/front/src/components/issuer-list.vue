<template>
  <seq v-if="values.length" v-slot="{ item }" :items="values" conjunction="or"
    ><country-label v-bind="$props" :key="item" :value="item"
  /></seq>
  <span v-else>{{ emptyText }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'

export default defineComponent({
  components: { Seq, CountryLabel },
  props: {
    values: {
      type: Array as PropType<string[]>,
      required: true,
    },
    emptyText: {
      type: String,
      default: 'any country',
    },
  },
  setup(props) {
    return {}
  },
})
</script>
