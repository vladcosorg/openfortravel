<template>
  <q-form @submit.prevent.stop="onSubmit">
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
    <div class="q-pt-xs q-pb-none text-center">
      <rich-email-input
        v-model="email"
        :autofocus="!noAutofocus"
        :is-loading="isLoading"
        :is-successful="isSuccessful"
      />
    </div>
    <div class="text-center">
      <submit-button
        :label="$t('components.subscribe.action')"
        :success-label="$t('components.subscribe.actionDone')"
        :is-loading="isLoading"
        :is-successful="isSuccessful"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  Ref,
  ref,
  toRef,
} from '@vue/composition-api'

import RichEmailInput from '@/front/src/components/form/rich-email-input.vue'
import SubmitButton from '@/front/src/components/form/submit-button.vue'
import { useRequestDispatcher } from '@/front/src/components/subscribe-form/composables'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { RichEmailInput, SubmitButton },
  inheritAttrs: false,
  props: {
    noAutofocus: {
      type: Boolean,
      default: false,
    },
    restriction: {
      type: Object as PropType<Restriction>,
      required: true,
    },
  },
  setup(props) {
    const { isLoading, isSuccessful, sendRequest } = useRequestDispatcher()
    const restriction: Ref<Restriction> = toRef(props, 'restriction')
    const email = ref('')
    return {
      isLoading,
      isSuccessful,
      email,
      onSubmit() {
        sendRequest(
          email.value,
          restriction.value.origin,
          restriction.value.destination,
        )
      },
    }
  },
})
</script>
