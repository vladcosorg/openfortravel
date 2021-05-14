<template>
  <q-step
    v-if="url"
    title="Finish!"
    :name="currentStep"
    :done="step === currentStep"
    :icon="finish"
  >
    <q-stepper-navigation class="q-gutter-x-sm">
      <q-btn
        size="lg"
        color="secondary"
        text-color="primary-inverse"
        label="Go to search results"
        :to="url"
      />
    </q-stepper-navigation>
  </q-step>
</template>

<script lang="ts">
import { roundFlag as finish } from '@quasar/extras/material-icons-round'
import { computed, defineComponent } from '@vue/composition-api'

import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { transformCountryCodeToOriginSlug } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'

export default defineComponent({
  mixins: [mixin],
  setup(props) {
    const currentStep = 7

    const url = computed(() => {
      const origin = (props.value as VisitorContextType)[
        RestrictionNodeType.ORIGIN
      ]

      if (!origin) {
        return
      }

      return {
        name: 'origin',
        params: {
          originSlug: transformCountryCodeToOriginSlug(origin),
          locale: useI18n().locale,
        },
      }
    })

    return {
      url,
      currentStep,
      finish,
    }
  },
})
</script>
