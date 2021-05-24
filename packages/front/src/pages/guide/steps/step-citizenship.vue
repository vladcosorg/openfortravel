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
      <citizenship-context hide-hint />
    </div>

    <step-navigation :step="step" v-on="$listeners" />
  </q-step>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import CitizenshipContext from '@/front/src/components/context-field/citizenship-context.vue'
import StepNavigation from '@/front/src/pages/guide/components/step-navigation.vue'
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
