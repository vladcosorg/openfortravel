<template>
  <multiple-list
    :options="options"
    label="Test types"
    empty-value="Any"
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import MultipleList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/base/multiple-list.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { testLabels } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default defineComponent({
  components: { MultipleList },
  inheritAttrs: false,
  props: {
    value: {
      type: [Array],
    },
  },
  setup() {
    return { options: transformFlatMapToArrayOfPairs(testLabels) }
  },
})
</script>
