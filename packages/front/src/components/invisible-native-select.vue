<template>
  <select
    v-model="currentValueRef"
    :class="$style.nativeSelect"
    @touchstart="isOptionListInitializedRef = true"
  >
    <option
      v-for="(option, index) in lazyOptionListRef"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style module>
.nativeSelect {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0;
}
</style>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'

export interface SelectItem {
  value: string
  label: string
}

export type SelectList = SelectItem[]

export default defineComponent({
  components: {},
  props: {
    value: {
      required: true,
      type: String,
    },
    options: {
      type: Array as PropType<SelectList>,
      required: true,
    },
    dropdownIcon: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const currentValueRef = computed<string>({
      get() {
        return props.value
      },
      set(value) {
        emit('input', value)
      },
    })

    const isOptionListInitializedRef = ref(false)
    const lazyOptionListRef = computed(() => {
      if (isOptionListInitializedRef.value === true) {
        return props.options
      }
      return [{ value: '', label: 'Loading' }]
    })

    return {
      lazyOptionListRef,
      isOptionListInitializedRef,
      currentValueRef,
    }
  },
})
</script>
