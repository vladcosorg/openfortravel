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
            {{ $t('components.subscribe.subtitle') }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-xs q-pb-md">
          <q-input
            ref="emailField"
            v-model="email"
            lazy-rules
            :rules="[isValidEmail]"
            type="email"
            autofocus
            no-error-icon
            standout
            :placeholder="$t('components.subscribe.placeholder')"
            :readonly="isLoading || isSubscribed"
          />
        </q-card-section>
        <!--        <q-card-section class="text-caption text-grey-5 q-pt-none">-->
        <!--          You will not receive any marketing emails, offers or any other kind of spam.-->
        <!--        </q-card-section>-->
        <q-separator dark />
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            text-color="grey-4"
            :label="$t('components.subscribe.close')"
            @click="$emit('input', false)"
          />

          <q-btn
            class="full-height"
            type="submit"
            unelevated
            color="secondary"
            text-color="primary"
            :label="buttonLabel"
            :icon-right="isSubscribed ? matDone : undefined"
            :loading="isLoading"
            :disable="isLoading || isSubscribed"
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
  <div v-else />
</template>

<style module>
.form {
  //margin-left: -16px; //margin-right: -16px; width: 100%;
}
</style>

<script lang="ts">
import { matDone } from '@quasar/extras/material-icons'
import { defineComponent, ref } from '@vue/composition-api'

import { useI18n, useKy } from '@/shared/src/composables/use-plugins'

export default defineComponent({
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
    destination: {
      type: String,
      required: false,
    },
  },
  setup(props, { root, emit }) {
    const i18n = useI18n()
    const email = ref('')
    const emailField = ref()
    const isLoading = ref(false)
    const buttonLabel = ref(i18n.t('components.subscribe.action'))
    const isSubscribed = ref(false)
    const closingCountdown = ref(0)

    return {
      email,
      emailField,
      isLoading,
      buttonLabel,
      isSubscribed,
      closingCountdown,
      matDone,
      async onSubmit() {
        emailField.value.validate()
        if (!emailField.value.hasError) {
          isLoading.value = true
          const payload = new URLSearchParams({
            origin: props.origin,
            email: email.value,
          })

          if (props.destination) {
            payload.set('destination', props.destination)
          }

          try {
            await useKy().post('/subscribe', { body: payload })
            buttonLabel.value = i18n.t('components.subscribe.actionDone')
            isSubscribed.value = true
            root.$q.notify({
              icon: matDone,
              color: 'positive',
              message: i18n.t('components.subscribe.notification') as string,
            })
          } catch {
            isSubscribed.value = false
          }

          isLoading.value = false
          const intervalID = setInterval(() => {
            closingCountdown.value = closingCountdown.value + 0.05
            if (closingCountdown.value >= 1 || !props.value) {
              clearInterval(intervalID)
              emit('input', false)
              isSubscribed.value = false
              email.value = ''
            }
          }, 150)
        }
      },
      isValidEmail() {
        return (
          /^.+@.+\..+$/.test(email.value) ||
          i18n.t('components.subscribe.invalidEmailWarning')
        )
      },
    }
  },
})
</script>
