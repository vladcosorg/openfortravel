<template>
  <q-step
    :name="currentStep"
    :done="step > currentStep"
    :caption="label"
    title="Are you vaccinated?"
  >
    <div class="text-subtitle1 q-mb-md">
      Please specify the country from which your journey will start?
    </div>

    <div class="row">
      <vaccine-dropdown v-model="internalValue" />
    </div>

    <step-navigation
      :step="step"
      :next-step="internalValue === false ? 5 : 6"
      v-on="$listeners"
    />
  </q-step>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@vue/composition-api'

import StepNavigation from '@/front/src/pages/guide/components/step-navigation.vue'
import VaccineDropdown from '@/front/src/pages/guide/components/vaccine-dropdown.vue'
import {
  createComputedSetter,
  useCaption,
} from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import {
  VaccineBrand,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { StepNavigation, VaccineDropdown },
  mixins: [mixin],
  setup(props) {
    const currentStep = 4
    const internalValue = createComputedSetter(
      toRef(props, 'value'),
      RestrictionNodeType.VACCINATED,
    )

    const label = useCaption(
      internalValue,
      (value: VaccineBrand) => `Yes, ${vaccineLabels[value]}`,
      () => 'Not vaccinated',
    )
    return {
      label,
      internalValue,
      currentStep,
    }
  },
})
</script>
