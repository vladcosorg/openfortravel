<template>
  <q-select
    v-model="internalValue"
    outlined
    emit-value
    map-options
    dense
    stack-label
    options-selected-class="text-bold text-accent"
    v-bind="$attrs"
    :class="$style.select"
  >
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
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
/* eslint-disable vue/no-unused-properties,vue/no-boolean-default */
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  components: {},
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<string[]>,
    },
    emptyValue: {
      type: String,
      default: '-',
    },
    options: {
      type: Array as PropType<Array<{ label: string; value: string }>>,
    },
  },
  setup(props, { emit }) {
    const internalValue = computed<string[]>({
      get() {
        return props.value ?? []
      },
      set(value: null | string[]) {
        if (value === null) {
          emit('input', [])
          return
        }

        emit('input', value)
      },
    })

    return {
      internalValue,
    }
  },
})
</script>
