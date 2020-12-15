<template>
  <q-field v-bind="$attrs" borderless dense :loading="loading">
    <template #control>
      <q-option-group
        v-model="internalValue"
        :options="options"
        type="radio"
        color="secondary"
        inline
        dense
        v-on="listeners"
      />
    </template>
  </q-field>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useAsyncListeners } from 'src/composables/use-async-listeners'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: Boolean,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const { loading, listeners } = useAsyncListeners()
    const fallbackValueStorage = ref<boolean | undefined>()
    const internalValue = computed<boolean | undefined>({
      get() {
        if (props.value === undefined) {
          return fallbackValueStorage.value
        }

        return props.value
      },
      set(value) {
        fallbackValueStorage.value = value
      },
    })
    return {
      internalValue,
      listeners,
      loading,
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    }
  },
})
</script>
