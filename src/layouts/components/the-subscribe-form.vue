<template>
  <q-dialog v-if="value !== undefined" full-width v-bind="$props" v-on="$listeners">
    <div>
      <q-card square class="bg-blue-grey-10" tag="form" novalidate @submit.prevent.stop="onSubmit">
        <q-card-section>
          <div class="text-h6">Subscribe for travel updates</div>
          <div class="text-body2 text-grey-5">Get notified when any destinations to or from Moldova are opening or
            closing
          </div>
        </q-card-section>
        <q-card-section class="q-pt-xs q-pb-md">
          <q-input ref="emailField"
                   v-model="email"
                   lazy-rules
                   :rules="[isValidEmail]"
                   type="email" autofocus standout
                   placeholder="Please enter your email"
                   :readonly="isLoading || isSubscribed"
          />
        </q-card-section>
        <q-card-section class="text-caption text-grey-5 q-pt-none">
          You will not receive any marketing emails, offers or any other kind of spam.
        </q-card-section>
        <q-separator dark/>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat text-color="grey-4" label="Close" @click="$emit('input', false)"/>
          <q-btn
            class="full-height"
            type="submit" unelevated
            color="secondary" text-color="primary"
            :label="buttonLabel"
            :icon-right="isSubscribed ? 'check' : undefined"
            :loading="isLoading"
            :disable="isLoading || isSubscribed"

          />
        </q-card-actions>
      </q-card>
      <q-linear-progress v-if="isLoading || isSubscribed"  :value="closingCountdown" color="secondary"/>
    </div>
  </q-dialog>
  <div v-else>
    <form :class="[$style.form, 'q-pa-md']" class="bg-blue-grey-10" @submit="onSubmit">
      <div class="text-h6 q-mb-md text-uppercase">Subscribe for travel updates</div>

      <q-input ref="emailField" v-model="email" type="email" required standout placeholder="Please insert your email">
        <template #after>
          <q-btn class="full-height" type="submit" unelevated color="secondary" text-color="primary"
                 label="Subscribe"/>
        </template>
      </q-input>

      <div class="text-caption text-grey-5 q-pt-md">
        You will not receive any marketing emails, offers or any other kind of spam.
      </div>
    </form>
  </div>

</template>

<style module>
.form {
//margin-left: -16px; //margin-right: -16px; width: 100%;
}

</style>


<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api'

export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false
    },
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: false
    }
  },
  setup(props, {root, emit}) {
    const email = ref('')
    const emailField = ref()
    const isLoading = ref(false)
    const buttonLabel = ref('Subscribe')
    const isSubscribed = ref(false)
    const closingCountdown = ref(0)

    return {
      email,
      emailField,
      isLoading,
      buttonLabel,
      isSubscribed,
      closingCountdown,
      async onSubmit() {
        emailField.value.validate()
        if (!emailField.value.hasError) {
          isLoading.value = true
          const payload = new URLSearchParams({
            origin: props.origin,
          })

          if (props.destination) {
            payload.set('destination', props.destination)
          }

          try {
            await root.$axios.post('/subscribe', payload)
            buttonLabel.value = 'Subscribed'
            isSubscribed.value = true
            root.$q.notify({
              icon: 'done',
              color: 'positive',
              message: 'You have been successfully subscribed'
            })
          } catch {
            isSubscribed.value = false
          }

          isLoading.value = false
          const intervalID = setInterval(() => {
            closingCountdown.value = closingCountdown.value + 0.05
            if (closingCountdown.value >= 1 || !props.value){
              console.log('cleared')
              clearInterval(intervalID)
              emit('input', false)
              isSubscribed.value = false
              email.value = ''
            }
          }, 150)
        }

      },
      isValidEmail() {
        return /^.+@.+\..+$/.test(email.value) || 'Please provide a valid email';
      },
    }
  },
})
</script>
