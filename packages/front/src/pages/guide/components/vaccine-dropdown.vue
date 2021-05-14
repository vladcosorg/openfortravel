<template>
  <generic-select
    :value="value === undefined ? false : value"
    :options="list"
    v-bind="$attrs"
    @input="$emit('input', $event === false ? undefined : $event)"
    v-on="$listeners"
  />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import GenericSelect from '@/front/src/pages/guide/components/generic-select.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

export default defineComponent({
  components: { GenericSelect },
  props: {
    value: {
      type: [String, Array, Boolean],
    },
  },
  setup() {
    const list = computed(() => [
      { label: 'Not vaccinated', value: false },
      ...transformFlatMapToArrayOfPairs(vaccineLabels),
    ])
    return {
      list,
    }
  },
})
</script>
