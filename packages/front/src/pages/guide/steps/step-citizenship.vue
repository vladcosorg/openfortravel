<template>
  <q-step
    :caption="caption"
    title="What is your current citizenship?"
    :name="currentStep"
    :done="step > currentStep"
  >
    <div class="text-subtitle1 q-mb-md">
      You can select multiple citizenships, we'll pick the one that is optimal
      for your travel destination.
    </div>

    <div class="row">
      <citizenship-context />
    </div>

    <step-navigation :step="step" v-bind="$attrs" />
  </q-step>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CitizenshipContext from '@/front/src/components/context-field/citizenship/citizenship-context.vue'
import StepNavigation from '@/front/src/components/context-field/helpers/step-navigation.vue'
import { useCaption } from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { CitizenshipContext, StepNavigation },
  mixins: [mixin],
  setup() {
    const currentStep = 3

    const caption = useCaption(
      RestrictionNodeType.CITIZENSHIP,
      getOriginLabelForCountryCode,
    )

    return {
      caption,
      currentStep,
    }
  },
})
</script>
