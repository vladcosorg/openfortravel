<template>
  <rich-text-input
    :placeholder="$t('components.form.email.placeholder') + ' *'"
    :rules="[isValidEmail]"
    type="email"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RichTextInput from '@/front/src/components/form/rich-text-input.vue'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { RichTextInput },
  inheritAttrs: false,
  setup() {
    return {
      isValidEmail(val: string) {
        return (
          /^.+@.+\..+$/.test(val) ||
          getI18nInstance().t('components.form.email.invalidEmail')
        )
      },
    }
  },
})
</script>
