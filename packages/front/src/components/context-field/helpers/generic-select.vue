<template>
  <q-select
    stack-label
    emit-value
    map-options
    use-input
    standout=""
    options-selected-class="text-bold text-accent"
    :clear-icon="clearIcon"
    :dropdown-icon="dropdownIcon"
    v-bind="$attrs"
    :class="['select q-select--ellipsis']"
    :options="filteredOptions"
    :model-value="modelValue"
    :multiple="multiple"
    @filter="filterFunction"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots.selected" #selected>
      <slot name="selected" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
  </q-select>
</template>

<style lang="sass" scoped>
.select::v-deep
  min-width: 250px
  max-width: 500px
  .q-field__control-container
    text-transform: capitalize
  .q-field__control
    cursor: pointer
  .q-field__input
    display: none

.select.q-field--focused:not(.q-field--dialog)::v-deep
  .q-field__input
    display: block

  .q-field__native > :not(.q-field__input)::v-deep
    display: none


.select.q-field--dialog::v-deep
  .q-field__input
    display: none

//.select.q-field--focused.q-select--single:not(.q-field--dialog)::v-deep,
//.q-select__dialog .q-select--single::v-deep
//  .q-field__native > span
//    display: none
</style>

<script lang="ts">
import {
  matCancel as clearIcon,
  matUnfoldMore as dropdownIcon,
} from '@quasar/extras/material-icons'
import { defineComponent, toRef } from 'vue'

import { useFilterableOptions } from '@/front/src/composables/misc'

export default defineComponent({
  inheritAttrs: false,
  props: {
    multiple: {
      type: Boolean,
    },
    options: {
      type: [Object, Array],
      required: true,
    },
    modelValue: {
      type: [String, Array, Boolean],
      required: true,
    },
  },
  setup(props, { attrs }) {
    const { filteredOptions, filterFunction } = useFilterableOptions(
      toRef(props, 'modelValue'),
      toRef(props, 'options'),
      attrs.multiple,
    )

    return {
      filteredOptions,
      filterFunction,
      dropdownIcon,
      clearIcon,
    }
  },
})
</script>
