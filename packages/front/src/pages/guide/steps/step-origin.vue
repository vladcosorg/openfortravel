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
    <step-navigation :step="step" v-on="$listeners" />
  </q-step>
</template>

<style lang="scss" module></style>

<script lang="ts">
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
