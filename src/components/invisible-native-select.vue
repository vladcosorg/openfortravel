<template>
  <select
    :value="plainValue"
    :class="$style.nativeSelect"
    @change="rethrowNormalizedEvent"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
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
import { computed, defineComponent, PropType } from '@vue/composition-api'

export interface SelectItem {
  value: string
  label: string
}

export type SelectList = SelectItem[]

export default defineComponent({
  components: {},
  props: {
    value: [Object, String],
    options: {
      type: Array as PropType<SelectList>,
      require: true,
    },
    dropdownIcon: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const plainValue = computed(() => {
      return props.value.value ?? props.value
    })
    const plainLabel = computed(() => {
      return props.value.label ?? props.value
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rethrowNormalizedEvent = (evnt: any) => {
      emit('input', evnt?.target?.value)
    }
    return { plainValue, plainLabel, rethrowNormalizedEvent }
  },
})
</script>
