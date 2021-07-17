<template>
  <q-select
    v-model="internalValue"
    outlined
    multiple
    emit-value
    map-options
    dense
    use-chips
    stack-label
    clearable
    use-input
    options-selected-class="text-bold text-accent"
    style="width: 200px; white-space: nowrap"
    :class="$style.select"
    :options="sortedOptions"
    v-bind="$attrs"
    @filter="filterFn"
  >
    <template #selected
      ><div class="ellipsis label">
        {{ internalValue.length > 0 ? internalValue.join(', ') : emptyValue }}
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
/* eslint-disable vue/no-unused-properties,vue/no-boolean-default */
import { computed, defineComponent, PropType, ref } from 'vue'

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
    const maybeFilteredOptions = ref(props.options)
    const sortedOptions = computed(() => {
      const options = [...maybeFilteredOptions.value]
      options.sort(
        (a, b) =>
          internalValue.value.includes(b.value) -
          internalValue.value.includes(a.value),
      )
      return options
    })
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

    const filterFn = (
      query: string,
      update: { (callback: { (): void }): void },
    ) => {
      if (query === '') {
        update(() => {
          maybeFilteredOptions.value = props.options
        })
        return
      }

      update(() => {
        const regex = new RegExp(`.*${query}.*`, 'i')
        const matches = props.options.filter(
          (lang) => regex.test(lang.value) || regex.test(lang.label),
        )

        matches.sort((a, b) => a.label.indexOf(query) - b.label.indexOf(query))
        maybeFilteredOptions.value = matches
      })
    }

    return {
      sortedOptions,
      internalValue,
      filterFn,
    }
  },
})
</script>
