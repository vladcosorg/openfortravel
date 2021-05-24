<template>
  <generic-select
    :value="value"
    :options="list"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import GenericSelect from '@/front/src/pages/guide/components/generic-select.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { GenericSelect },
  props: {
    value: {
      type: [String, Array],
    },
  },
  setup() {
    const list = computed(() =>
      transformFlatMapToArrayOfPairs(getOriginLabels()),
    )
    return {
      list,
    }
  },
})
</script>
