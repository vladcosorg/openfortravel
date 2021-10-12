<template>
  <section class="section q-py-xl" style="background-color: #1d2a4b">
    <div class="container">
      <div class="row q-col-gutter-x-xl q-py-xl">
        <div class="col-6 bg">
          <h2 id="reach-out">Reach out to our team</h2>
          <h5 class="text-primary-subtle lh-base">
            We’re always looking to understand how we can help our customers
            make the best use of Hasura. Our sales team would love to set up a
            call/chat.
          </h5>
        </div>
        <q-form class="col q-gutter-y-sm">
          <rich-text-input
            v-model="firstName"
            :label="$t('page.forBusiness.sections.contact.firstName')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />
          <rich-text-input
            v-model="lastName"
            :label="$t('page.forBusiness.sections.contact.lastName')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />

          <rich-email-input
            v-model="email"
            :label="$t('page.forBusiness.sections.contact.email')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />
          <rich-text-input
            v-model="organization"
            :label="$t('page.forBusiness.sections.contact.org')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />
          <rich-text-input
            v-model="jobTitle"
            :label="$t('page.forBusiness.sections.contact.jobTitle')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />
          <rich-text-input
            v-model="message"
            :label="$t('page.forBusiness.sections.contact.message')"
            type="textarea"
            :is-loading="isLoading"
            :is-required="true"
            :is-successful="isSuccessful"
          />
          <submit-button
            :label="$t('page.contact.sendButton')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />
        </q-form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bg {
  @media (min-width: $breakpoint-md-min) {
    background-image: url('../../../assets/bird.svg');
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: auto 60%;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import RichEmailInput from '@/front/src/components/form/rich-email-input.vue'
import RichTextInput from '@/front/src/components/form/rich-text-input.vue'
import SubmitButton from '@/front/src/components/form/submit-button.vue'
import { useRequestDispatcher } from '@/front/src/composables/request-dispatcher'

export default defineComponent({
  components: { SubmitButton, RichTextInput, RichEmailInput },
  props: {},
  setup(props) {
    const { isLoading, isSuccessful } = useRequestDispatcher()
    const email = ref('')
    const message = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const organization = ref('')
    const jobTitle = ref('')
    return {
      email,
      message,
      isLoading,
      isSuccessful,
      firstName,
      lastName,
      jobTitle,
      organization,
    }
  },
})
</script>
