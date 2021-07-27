<template>
  <multiple-list
    :options="options"
    label="Vaccine producers"
    empty-value="Any"
    :value="value"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MultipleList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/base/multiple-list.vue'
import { vaccineSelectList } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: { MultipleList },
  inheritAttrs: false,
  props: {
    value: {
      type: [Array],
    },
  },
  setup() {
    return { options: vaccineSelectList }
  },
})
</script>
