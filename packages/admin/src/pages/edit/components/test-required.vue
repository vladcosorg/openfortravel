<template>
  <q-field :label="label" outlined stack-label :loading="loading">
    <template #control>
      <q-option-group
        v-model="internalValue"
        :options="listOptions"
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
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'

import { ListItem } from '@/front/src/layouts/components/the-country-list/country-select.vue'
import { useAsyncListeners } from '@/shared/src/composables/use-async-listeners'

export default defineComponent({
  components: {},
  props: {
    label: {
      type: String,
    },
    value: {
      type: Boolean,
      required: false,
    },
    options: {
      type: Object as PropType<ListItem>,
      required: false,
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

    const listOptions = computed(
      () =>
        props.options ?? [
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ],
    )
    return {
      internalValue,
      listeners,
      loading,
      listOptions,
    }
  },
})
</script>
