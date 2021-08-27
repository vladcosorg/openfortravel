<template>
  <q-select
    ref="selectDOM"
    emit-value
    map-options
    standout=""
    style="display: inline-block"
    options-selected-class="text-bold text-accent"
    :clear-icon="clearIcon"
    :dropdown-icon="dropdownIcon"
    v-bind="$attrs"
    :use-input="!disableInput"
    :options="filteredOptions"
    :model-value="modelValue"
    class="inline-select"
    borderless
    behavior="dialog"
    dense
    :loading="loading"
    @filter="filterFunction"
  >
    <template #before>
      <a @click="onBeforeClick">
        <slot name="inline-label" />
        <q-spinner v-if="loading" size="xs" />
        <q-icon v-else :name="dropdownIcon" />
      </a>
    </template>
    <template #selected-item="scope">
      <q-chip
        removable
        :icon-remove="clearIcon"
        :tabindex="scope.tabindex"
        @remove="scope.removeAtIndex(scope.index)"
      >
        {{ scope.opt.label }}
      </q-chip>
    </template>
  </q-select>
</template>

<style lang="sass">
.inline-select
  font-size: inherit !important
  display: inline-block
  .q-field__marginal
    font-size: inherit !important
  .q-field__append
    padding: 0 !important
  .q-field__control, .q-field__native, .q-field__append, .q-field__before
    padding: 0
    padding: 0
    min-height: auto !important
    height: auto !important
  .q-field__inner
    display: none
  &:hover .q-field__before a
    text-decoration: underline
    text-underline-position: under
    text-decoration-style: solid
    text-decoration-color: rgba(255, 255, 255, 0.9)
    text-decoration-thickness: 1px
</style>

<script lang="ts">
import {
  matCancel as clearIcon,
  matUnfoldMore as dropdownIcon,
} from '@quasar/extras/material-icons'
import { defineComponent, ref, toRef } from 'vue'

import { useFilterableOptions } from '@/front/src/composables/misc'

export default defineComponent({
  inheritAttrs: false,
  props: {
    options: {
      type: [Object, Array],
      required: true,
    },
    modelValue: {
      type: [String, Array, Boolean],
      required: true,
    },
    disableInput: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
  },
  setup(props, { attrs }) {
    const selectDOM = ref()

    const { filterFunction, filteredOptions } = useFilterableOptions(
      toRef(props, 'modelValue'),
      toRef(props, 'options'),
      attrs.multiple,
    )
    const onBeforeClick = () => {
      selectDOM.value.showPopup()
    }
    return {
      dropdownIcon,
      clearIcon,
      filterFunction,
      filteredOptions,
      selectDOM,
      onBeforeClick,
    }
  },
})
</script>
