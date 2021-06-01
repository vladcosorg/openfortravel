<template>
  <q-select
    :value="value"
    dense
    outlined
    multiple
    :options="options"
    use-input
    label="Test types"
    stack-label
    clearable
    :class="$style.select"
    style="width: 200px; white-space: nowrap"
    emit-value
    map-options
    v-on="$listeners"
  >
    <template #selected
      ><div class="ellipsis label">
        {{ value && value.length ? value.join(', ') : 'Any' }}
      </div>
    </template>
  </q-select>
</template>

<style lang="scss" module>
.select :global(.q-field__input) {
  width: 20px;
  display: none;
}

.select:global(.q-field--focused .label) {
  display: none;
}

.select:global(.q-field--focused .q-field__input) {
  display: block;
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { testLabels } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default defineComponent({
  components: {},
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
