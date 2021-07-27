<template>
  <multiple-list
    :options="options"
    label="Languages"
    empty-value="No information"
    :value="value"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import rawLanguageList from 'iso-639-1/src/data'

import MultipleList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/base/multiple-list.vue'

const languageList = Object.entries(rawLanguageList).map(
  ([countryCode, value]) => ({
    label: value.name,
    value: countryCode,
  }),
)
export default defineComponent({
  components: { MultipleList },
  inheritAttrs: false,
  props: {
    value: {
      type: [Array],
    },
  },
  setup() {
    return { options: languageList }
  },
})
</script>
