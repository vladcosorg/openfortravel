<template>
  <q-step
    title="What is your starting point?"
    :caption="label"
    :name="currentStep"
    :done="step > currentStep"
  >
    <div class="text-subtitle1 q-mb-md">
      Please specify the country from which your journey will start?
    </div>

    <div class="row">
      <country-dropdown v-model="internalValue" />
    </div>
    <step-navigation :step="step" v-bind="$attrs" />
  </q-step>
</template>

<script lang="ts">
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { defineComponent } from 'vue'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import StepNavigation from '@/front/src/components/context-field/helpers/step-navigation.vue'
import {
  createComputedSetter,
  useCaption,
} from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'

export default defineComponent({
  components: { StepNavigation, CountryDropdown },
  mixins: [mixin],
  setup() {
    const currentStep = 2
    const internalValue = createComputedSetter(RestrictionNodeType.ORIGIN)
    const label = useCaption(
      RestrictionNodeType.ORIGIN,
      getOriginLabelForCountryCode,
    )

    return {
      internalValue,
      label,
      currentStep,
    }
  },
})
</script>
