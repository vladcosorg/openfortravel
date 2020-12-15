<template>
  <q-input
    v-model.number="modelRef"
    type="number"
    min="0"
    outlined
    dense
    :debounce="1000"
  >
    <template v-if="confirm" #append>
      <q-btn
        icon="done"
        :color="isBuffering ? 'green' : 'gray'"
        flat
        dense
        @click="emit"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api'

import {
  useBufferedModel,
  usePassthroughModel,
} from 'src/composables/use-computed-vmodel'

export default defineComponent({
  props: {
    confirm: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const { value } = toRefs(props)
    return {
      ...(props.confirm
        ? useBufferedModel(value, 0)
        : usePassthroughModel(value)),
    }
  },
})
</script>
