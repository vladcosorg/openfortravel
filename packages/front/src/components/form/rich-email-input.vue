<template>
  <rich-text-input
    :placeholder="$t('components.form.email.placeholder') + ' *'"
    :rules="[isValidEmail]"
    type="email"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import RichTextInput from '@/front/src/components/form/rich-text-input.vue'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { RichTextInput },
  inheritAttrs: false,
  setup() {
    return {
      isValidEmail(val: string) {
        return /^.+@.+\..+$/.test(val) || useI18n().t('components.form.email.invalidEmail')
      },
    }
  },
})
</script>
