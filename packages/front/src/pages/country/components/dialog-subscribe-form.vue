<template>
  <q-dialog
    v-if="value !== undefined"
    full-width
    v-bind="$props"
    v-on="$listeners"
  >
    <div>
      <q-card
        square
        class="bg-blue-grey-10 relative-position"
        tag="form"
        novalidate
        @submit.prevent.stop="onSubmit"
      >
        <q-card-section class="bg-blue-grey-9">
          <div class="text-uppercase">
            {{ $t('components.subscribe.title') }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-body2 text-grey-5">
            {{ $t('components.subscribe.subtitle.origin', { origin }) }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-xs q-pb-md">
          <email-input
            v-model="email"
            autofocus
            :is-loading="isLoading"
            :is-subscribed="isSubscribed"
            @validation="isFormValid = $event"
          />
        </q-card-section>
        <q-separator dark />
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            text-color="grey-4"
            :label="$t('components.subscribe.close')"
            @click="$emit('input', false)"
          />
          <submit-button
            :is-loading="isLoading"
            :is-subscribed="isSubscribed"
          />
        </q-card-actions>
      </q-card>
      <q-linear-progress
        v-if="isLoading || isSubscribed"
        :reverse="!isLoading"
        :indeterminate="isLoading"
        :value="closingCountdown"
        color="secondary"
      />
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import { useRequestDispatcher } from '@/front/src/components/subscribe-form/composables'
import EmailInput from '@/front/src/components/subscribe-form/email-input.vue'
import SubmitButton from '@/front/src/components/subscribe-form/submit-button.vue'

export default defineComponent({
  components: { SubmitButton, EmailInput },
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    origin: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { isLoading, isSubscribed, sendRequest } = useRequestDispatcher()
    const email = ref('')
    const closingCountdown = ref(0)
    const isFormValid = ref(false)
    return {
      email,
      isLoading,
      isSubscribed,
      closingCountdown,
      isFormValid,
      onSubmit() {
        if (isFormValid.value) {
          sendRequest(email.value, props.origin)

          const intervalID = setInterval(() => {
            closingCountdown.value = closingCountdown.value + 0.05
            if (closingCountdown.value >= 1 || !props.value) {
              clearInterval(intervalID)
              emit('input', false)
              isSubscribed.value = false
            }
          }, 150)
        }
      },
    }
  },
})
</script>
