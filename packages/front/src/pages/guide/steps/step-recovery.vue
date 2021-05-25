<template>
  <q-step
    :caption="label"
    title="Have you recently recovered from COVID-19?"
    :name="currentStep"
    :done="step > currentStep && skip"
  >
    <div class="column">
      <div>
        <q-radio
          v-model="radioValue"
          class="inline"
          :val="false"
          label="No, I didn't"
        />
      </div>
      <div>
        <q-radio v-model="radioValue" class="inline" :val="true" label="Yes" />,
        approximatively
        <q-input
          v-model="daysValue"
          :disable="!radioValue"
          class="inline"
          placeholer="days"
          type="number"
          dense
          input-style="width: 50px"
        />
        days ago
      </div>
    </div>

    <step-navigation :step="step" />
  </q-step>
</template>

<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { computed, defineComponent } from '@vue/composition-api'

import StepNavigation from '@/front/src/pages/guide/components/step-navigation.vue'
import {
  createComputedSetter,
  useCaption,
} from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { StepNavigation },
  mixins: [mixin],
  setup(props) {
    const currentStep = 5

    const internalValue = createComputedSetter(RestrictionNodeType.RECOVERY)
    const daysValue = computed({
      get() {
        return Number.isInteger(internalValue.value) ? internalValue.value : 30
      },
      set(value) {
        internalValue.value = Number.parseInt(value, 10)
      },
    })

    const radioValue = computed({
      get() {
        return !(internalValue.value === undefined)
      },
      set(value) {
        value === true
          ? (internalValue.value = daysValue.value)
          : (internalValue.value = undefined)
      },
    })

    const label = useCaption(
      RestrictionNodeType.RECOVERY,
      (days) => `Yes, approximatively ${days} days ago`,
      () => "No, I didn't",
    )
    const skip = computed(
      () => props.value[RestrictionNodeType.VACCINATED] !== false,
    )

    const list = computed(() => [
      { label: 'Not vaccinated', value: false },
      ...transformFlatMapToArrayOfPairs(vaccineLabels),
    ])
    return {
      label,
      internalValue,
      radioValue,
      daysValue,
      list,
      icon,
      currentStep,
      skip,
    }
  },
})
</script>
