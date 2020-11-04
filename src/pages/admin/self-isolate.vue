<template>
  <q-input
    v-model.number="internalValue"
    type="number"
    :loading="loading"
    outlined
    dense
    :debounce="1000"
  />
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api'

import { useAsyncListeners } from 'src/composables/use-async-listeners'
import { useComputedVmodel } from 'src/composables/use-computed-vmodel'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const { loading, listeners } = useAsyncListeners()
    const { value } = toRefs(props)
    const internalValue = useComputedVmodel(value, 0, 'input')
    return { internalValue, loading, listeners }
  },
})
</script>
