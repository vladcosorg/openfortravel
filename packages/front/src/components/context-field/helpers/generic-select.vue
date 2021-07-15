<template>
  <q-select
    emit-value
    map-options
    options-selected-class="text-bold text-accent"
    :clear-icon="clearIcon"
    :dropdown-icon="dropdownIcon"
    v-bind="Object.assign({ standout: '' }, $attrs)"
    :class="[
      $style.select,
      inline ? $style.selectInline : $style.selectBlock,
      noEllipsis ? '' : 'q-select--ellipsis',
      inheritFontSize ? 'q-field--inherit-font-size' : '',
      $attrs.behavior === 'dialog' ? 'q-field--dialog' : '',
    ]"
    :use-input="!disableInput"
    :options="internalOptions"
    :value="value"
    :multiple="multiple"
    placeholder="Start typing to search"
    v-on="$listeners"
    @filter="filterFn"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label class="text-capitalize" v-html="scope.opt.label" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style lang="sass" module>
.select

  \:global
    .q-field__control
      cursor: pointer

    .q-field__input
      display: none

.select:global(.q-field--focused:not(.q-field--dialog))
  \:global
    .q-field__input
      display: block

    .q-field__native > :not(.q-field__input)
      display: none


.select:global(.q-field--dialog)
  \:global
    .q-field__input
      display: none


.select:global(.q-field--focused.q-select--single:not(.q-field--dialog)), :global(.q-select__dialog .q-select--single)
  \:global
    .q-field__native > span
      display: none

.selectBlock
  min-width: 250px
  max-width: 500px
  \:global
    .q-field__control-container
      text-transform: capitalize

.selectInline
  display: inline-block

  \:global
    .q-field__control, .q-field__native, .q-field__append
      min-height: auto !important
      height: auto !important

    .q-field__append
      padding: 0 !important

.selectInline:hover
  \:global
    .q-field__native
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
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  inheritAttrs: false,
  props: {
    inline: {
      type: Boolean,
    },
    multiple: {
      type: Boolean,
    },
    options: {
      type: [Object, Array],
      required: true,
    },
    value: {
      type: [String, Array, Boolean],
      required: true,
    },
    noEllipsis: {
      type: Boolean,
    },
    inheritFontSize: {
      type: Boolean,
    },
    disableInput: {
      type: Boolean,
    },
  },
  setup(props) {
    const maybeFilteredOptions = ref(props.options)
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

    const internalOptions = computed(() => {
      const options = [...maybeFilteredOptions.value]

      if (!props.multiple) {
        return options
      }

      options.sort(
        (a, b) => props.value.includes(b.value) - props.value.includes(a.value),
      )

      return options
    })
    return { dropdownIcon, clearIcon, filterFn, internalOptions }
  },
})
</script>
