<template>
  <select
    v-if="isGroupedList"
    v-model="currentValueRef"
    :class="$style.nativeSelect"
    @touchstart="isOptionListInitializedRef = true"
  >
    <optgroup
      v-for="(subOptions, label) in lazyOptionListRef"
      :key="label"
      :label="label"
    >
      <option
        v-for="(option, index) in subOptions"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </optgroup>
  </select>
  <select
    v-else
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
import { computed, defineComponent, ref } from '@vue/composition-api'

export interface SelectItem {
  value: string
  label: string
}

export type SelectList = SelectItem[]

export default defineComponent({
  props: {
    value: {
      required: false,
      type: String,
    },
    options: {
      type: [Array, Object],
      required: true,
    },
    dropdownIcon: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const currentValueRef = computed<string | undefined>({
      get() {
        return props.value
      },
      set(value) {
        emit('input', value)
      },
    })

    const isGroupedList = computed(() => !Array.isArray(props.options))

    const isOptionListInitializedRef = ref(false)
    const lazyOptionListRef = computed(() => {
      if (isOptionListInitializedRef.value === true) {
        return props.options
      }
      return [{ value: '', label: 'Loading' }]
    })

    return {
      isGroupedList,
      lazyOptionListRef,
      isOptionListInitializedRef,
      currentValueRef,
    }
  },
})
</script>
