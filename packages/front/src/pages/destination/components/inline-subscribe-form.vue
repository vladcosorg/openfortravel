<template>
  <q-form @submit.prevent.stop="onSubmit">
    <widget-header
      v-if="restriction"
      :title="$t('components.subscribe.title')"
      :subtitle="
        restriction.isAllowed()
          ? $t('components.subscribe.subtitle.destination.isAllowed', {
              origin: restriction.originLabel,
              destination: restriction.destinationLabel,
            })
          : $t('components.subscribe.subtitle.destination.isForbidden', {
              origin: restriction.originLabel,
              destination: restriction.destinationLabel,
            })
      "
    />
    <q-skeleton v-else type="text" width="70%" />
    <div class="q-pt-xs q-pb-none text-center">
      <rich-email-input
        v-model="email"
        :autofocus="!noAutofocus"
        :is-loading="isLoading"
        :is-successful="isSuccessful"
      />
    </div>
    <div>
      <submit-button
        class="q-mt-sm"
        :label="$t('components.subscribe.action')"
        :success-label="$t('components.subscribe.actionDone')"
        :is-loading="isLoading"
        :is-successful="isSuccessful"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'

import RichEmailInput from '@/front/src/components/form/rich-email-input.vue'
import SubmitButton from '@/front/src/components/form/submit-button.vue'
import { useRequestDispatcher } from '@/front/src/components/subscribe-form/composables'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import type { Restriction } from '@/shared/src/api/restrictions/models'

import type { PropType } from 'vue'

export default defineComponent({
  components: { WidgetHeader, RichEmailInput, SubmitButton },
  inheritAttrs: false,
  props: {
    noAutofocus: {
      type: Boolean,
      default: false,
    },
    restriction: {
      type: Object as PropType<Restriction>,
    },
  },
  setup(props) {
    const { isLoading, isSuccessful, sendRequest } = useRequestDispatcher()
    const restriction = toRef(props, 'restriction')
    const email = ref('')
    return {
      isLoading,
      isSuccessful,
      email,
      onSubmit() {
        if (restriction.value) {
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
