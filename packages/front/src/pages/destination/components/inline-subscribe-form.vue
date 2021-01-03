<template>
  <div>
    <q-card
      square
      flat
      class="relative-position"
      tag="form"
      novalidate
      @submit.prevent.stop="onSubmit"
    >
      <q-card-section>
        <div class="text-h6">
          {{ $t('components.subscribe.title') }}
        </div>
        <div class="text-body2 text-grey-5">
          {{
            restriction.isAllowed()
              ? $t('components.subscribe.subtitle.destination.isAllowed', {
                  origin: restriction.originLabel,
                  destination: restriction.destinationLabel,
                })
              : $t('components.subscribe.subtitle.destination.isForbidden', {
                  origin: restriction.originLabel,
                  destination: restriction.destinationLabel,
                })
          }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-xs q-pb-none text-center">
        <email-input
          v-model="email"
          :is-loading="isLoading"
          :is-subscribed="isSubscribed"
          @validation="isFormValid = $event"
        />
      </q-card-section>
      <q-card-section class="text-center">
        <submit-button :is-loading="isLoading" :is-subscribed="isSubscribed" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  Ref,
  ref,
  toRef,
} from '@vue/composition-api'

import { useRequestDispatcher } from '@/front/src/components/subscribe-form/composables'
import EmailInput from '@/front/src/components/subscribe-form/email-input.vue'
import SubmitButton from '@/front/src/components/subscribe-form/submit-button.vue'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { SubmitButton, EmailInput },
  inheritAttrs: false,
  props: {
    restriction: {
      type: Object as PropType<Restriction>,
      required: true,
    },
  },
  setup(props) {
    const { isLoading, isSubscribed, sendRequest } = useRequestDispatcher()
    const restriction: Ref<Restriction> = toRef(props, 'restriction')
    const email = ref('')
    const isFormValid = ref(false)
    return {
      isLoading,
      isSubscribed,
      email,
      isFormValid,
      onSubmit() {
        if (isFormValid.value) {
          sendRequest(
            email.value,
            restriction.value.origin,
            restriction.value.destination,
          )
        }
      },
    }
  },
})
</script>
