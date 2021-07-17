<template>
  <q-dialog v-if="modelValue !== undefined" v-bind="$props">
    <div>
      <q-form class="bg-blue-grey-10" @submit.prevent.stop="onSubmit">
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
          <rich-email-input
            v-model="email"
            autofocus
            :is-loading="isLoading"
            :is-successful="isSuccessful"
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
            :label="$t('components.subscribe.action')"
            :success-label="$t('components.subscribe.actionDone')"
            :is-loading="isLoading"
            :is-successful="isSuccessful"
          />
        </q-card-actions>
      </q-form>
      <q-linear-progress
        v-if="isLoading || isSuccessful"
        :reverse="!isLoading"
        :indeterminate="isLoading"
        :value="closingCountdown"
        color="secondary"
      />
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import RichEmailInput from '@/front/src/components/form/rich-email-input.vue'
import SubmitButton from '@/front/src/components/form/submit-button.vue'
import { useRequestDispatcher } from '@/front/src/components/subscribe-form/composables'

export default defineComponent({
  components: { RichEmailInput, SubmitButton },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    origin: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { isLoading, isSuccessful, sendRequest, reset } =
      useRequestDispatcher()
    const email = ref('')
    const closingCountdown = ref(0)
    return {
      email,
      isLoading,
      isSuccessful,
      closingCountdown,
      async onSubmit() {
        await sendRequest(email.value, props.origin)
        const intervalID = setInterval(() => {
          closingCountdown.value = closingCountdown.value + 0.05
          if (closingCountdown.value >= 1 || !props.modelValue) {
            clearInterval(intervalID)
            emit('update:modelValue', false)
            reset()
          }
        }, 150)
      },
    }
  },
})
</script>
