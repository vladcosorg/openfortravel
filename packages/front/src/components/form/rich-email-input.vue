<template>
  <rich-text-input
    :placeholder="$t('components.form.email.placeholder') + ' *'"
    :rules="[isValidEmail]"
    type="email"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { useI18n } from '@/shared/src/composables/use-plugins'
import { defineComponent } from 'vue'

import RichTextInput from '@/front/src/components/form/rich-text-input.vue'

export default defineComponent({
  components: { RichTextInput },
  inheritAttrs: false,
  setup() {
    return {
      isValidEmail(val: string) {
        return (
          /^.+@.+\..+$/.test(val) ||
          useI18n().t('components.form.email.invalidEmail')
        )
      },
    }
  },
})
</script>
