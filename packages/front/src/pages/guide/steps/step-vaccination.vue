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
      <citizenship-field />
    </div>

    <step-navigation
      :step="step"
      :next-step="!isVaccinated ? 5 : 6"
      v-on="$listeners"
    />
  </q-step>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CitizenshipField from '@/front/src/components/context-field/vaccination-context.vue'
import StepNavigation from '@/front/src/pages/guide/components/step-navigation.vue'
import { useCaption } from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import {
  VaccineBrand,
  vaccineLabels,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { CitizenshipField, StepNavigation },
  mixins: [mixin],
  setup() {
    const currentStep = 4

    const isVaccinated = computed(
      () =>
        useRootStore().state.visitorContext[RestrictionNodeType.VACCINATED] !==
        false,
    )
    const label = useCaption(
      RestrictionNodeType.VACCINATED,
      (value: VaccineBrand) => `Yes, ${vaccineLabels[value]}`,
      () => 'Not vaccinated',
    )
    return {
      isVaccinated,
      label,
      currentStep,
    }
  },
})
</script>
