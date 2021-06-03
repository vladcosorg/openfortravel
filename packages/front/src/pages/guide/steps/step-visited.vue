<template>
  <q-step
    title="What countries have you visited recently?"
    :name="currentStep"
    :done="step > currentStep"
    :caption="label"
  >
    <div class="row">
      <did-not-visit-countries-context />
    </div>

    <step-navigation :step="step" v-on="$listeners" />
  </q-step>
</template>

<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { defineComponent } from '@vue/composition-api'

import DidNotVisitCountriesContext from '@/front/src/components/context-field/did-not-visit-countries-context.vue'
import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import StepNavigation from '@/front/src/components/context-field/helpers/step-navigation.vue'
import {
  createComputedSetter,
  useCaption,
} from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { DidNotVisitCountriesContext, StepNavigation, CountryDropdown },
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
