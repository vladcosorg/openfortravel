<template>
  <q-input
    ref="domObj"
    :class="[$style.input, bgStatus]"
    :lazy-rules="false"
    :rules="[isValidEmail]"
    type="email"
    no-error-icon
    standout
    :placeholder="$t('components.subscribe.placeholder')"
    :readonly="isLoading || isSubscribed"
    v-bind="$props"
    v-on="$listeners"
    @input="onInput"
  />
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
</style>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSubscribed: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const domObj = ref()

    const bgStatus = computed(() => {
      if (!domObj.value || props.value.length === 0) {
        return
      }

      return !domObj.value.hasError ? 'success' : 'error'
    })

    return {
      domObj,
      bgStatus,
      onInput() {
        emit('validation', !domObj.value.hasError)
      },
      isValidEmail() {
        return (
          /^.+@.+\..+$/.test(props.value) ||
          useI18n().t('components.subscribe.invalidEmailWarning')
        )
      },
    }
  },
})
</script>
