<template>
  <inner-page :title="$t('page.contact.pageTitle')">
    <div class="row justify-center">
      <q-form
        class="col-md-6 col-sm-8 col-12 q-gutter-md text-sm-left text-center"
        @submit.prevent.stop="onSubmit"
      >
        <rich-email-input
          v-model="email"
          :is-loading="isLoading"
          :is-successful="isSuccessful"
        />
        <rich-text-input
          v-model="message"
          :placeholder="$t('page.contact.messageField')"
          type="textarea"
          :is-loading="isLoading"
          :is-required="true"
          :is-successful="isSuccessful"
        />
        <submit-button
          class="q-mt-md"
          :label="$t('page.contact.sendButton')"
          :is-loading="isLoading"
          :is-successful="isSuccessful"
        />
      </q-form>
    </div>
  </inner-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import RichEmailInput from '@/front/src/components/form/rich-email-input.vue'
import RichTextInput from '@/front/src/components/form/rich-text-input.vue'
import SubmitButton from '@/front/src/components/form/submit-button.vue'
import InnerPage from '@/front/src/components/inner-page.vue'
import { useRequestDispatcher } from '@/front/src/composables/request-dispatcher'
import { useKy, useVueI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { SubmitButton, InnerPage, RichTextInput, RichEmailInput },
  props: {},
  setup() {
    const { t } = useVueI18n()
    const { isLoading, isSuccessful, dispatcher } = useRequestDispatcher()
    const email = ref('')
    const message = ref('')
    return {
      email,
      message,
      isLoading,
      isSuccessful,
      onSubmit() {
        dispatcher(
          useKy().post(
            'https://us-central1-openfortravel.cloudfunctions.net/emailForwarder',
            {
              body: new URLSearchParams({
                from: email.value,
                message: message.value,
              }),
            },
          ),
          t('page.contact.messageSent') as string,
        )
      },
    }
  },
})
</script>
