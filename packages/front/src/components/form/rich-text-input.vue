<template>
  <q-input
    ref="domObj"
    lazy-rules="ondemand"
    :rules="[isRequired ? isRequiredValidator : undefined]"
    :class="[$style.input]"
    no-error-icon
    standout
    stack-label
    :readonly="isLoading || isSuccessful"
    v-bind="$attrs"
    :model-value="modelValue"
    @input="onInput"
  >
    <template v-if="!isLoading && !isSuccessful" #append>
      <q-icon v-if="isValid === true" :name="successIcon" color="positive" />
      <q-icon v-if="isValid === false" :name="errorIcon" color="negative" />
    </template>
  </q-input>
</template>

<style module lang="scss">
.input:global(.q-field--focused) {
  &:global(.error .q-field__control) {
    background-color: $red-3;
  }
  &:global(.success .q-field__control) {
    background-color: $green-3;
  }
}
.input:global(.q-field--highlighted) {
  :global {
    .q-field__control {
      background-color: var(--q-primary-elevated) !important;
    }
    .q-field__native {
      color: var(--q-primary) !important;
    }
  }
}
</style>

<script lang="ts">
import {
  matDone as successIcon,
  matPriorityHigh as errorIcon,
} from '@quasar/extras/material-icons'
import { defer, throttle } from 'lodash'
import { computed, defineComponent, ref } from 'vue'

import { useI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  inheritAttrs: false,
  props: {
    isRequired: {
      type: Boolean,
      default: false,
    },
    isSuccessful: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const domObj = ref()
    const isValid = computed(() => {
      if (!domObj.value) {
        return
      }
      if (!domObj.value || props.modelValue.length === 0) {
        return
      }

      return !domObj.value.hasError
    })
    const throttledValidator = throttle(() => {
      defer(() => domObj.value.validate())
    }, 1000)

    return {
      isValid,
      domObj,
      successIcon,
      errorIcon,
      isRequiredValidator(val: string) {
        return val.length > 0 || useI18n().t('components.form.input.emptyField')
      },
      onInput() {
        throttledValidator()
      },
    }
  },
})
</script>
