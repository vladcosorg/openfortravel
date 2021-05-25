<template>
  <q-step
    title="What countries have you visited recently?"
    :name="currentStep"
    :done="step > currentStep"
    :caption="label"
  >
    <div class="text-subtitle1 q-mb-md">
      Please specify the country from which your journey will start?
    </div>

    <div class="row">
      <country-dropdown v-model="internalValue" multiple clearable />
    </div>

    <step-navigation :step="step" v-on="$listeners" />
  </q-step>
</template>

<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/pages/guide/components/country-dropdown.vue'
import StepNavigation from '@/front/src/pages/guide/components/step-navigation.vue'
import {
  createComputedSetter,
  useCaption,
} from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { StepNavigation, CountryDropdown },
  mixins: [mixin],
  setup() {
    const currentStep = 6
    const internalValue = createComputedSetter(
      RestrictionNodeType.DID_NOT_VISIT_COUNTRIES,
    )
    const label = useCaption(internalValue, getOriginLabelForCountryCode)

    return {
      label,
      internalValue,
      icon,
      currentStep,
    }
  },
})
</script>
