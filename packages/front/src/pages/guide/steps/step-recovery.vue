<template>
  <q-step
    :caption="label"
    title="Have you recently recovered from COVID-19?"
    :name="currentStep"
    :done="step > currentStep"
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
import { computed, defineComponent } from '@vue/composition-api'

import StepNavigation from '@/front/src/pages/guide/components/step-navigation.vue'
import {
  createComputedSetter,
  useCaption,
} from '@/front/src/pages/guide/guide-composable'
import mixin from '@/front/src/pages/guide/steps/mixin.vue'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { StepNavigation },
  mixins: [mixin],
  setup() {
    const currentStep = 5

    const internalValue = createComputedSetter(RestrictionNodeType.RECOVERY)
    const daysValue = computed({
      get() {
        return (
          Number.isInteger(internalValue.value)
            ? (internalValue.value as number)
            : 30
        ).toString()
      },
      set(value: string) {
        internalValue.value = Number.parseInt(value, 10)
      },
    })

    const radioValue = computed({
      get() {
        return !(internalValue.value === undefined)
      },
      set(value) {
        value === true
          ? (internalValue.value = Number.parseInt(daysValue.value, 10))
          : (internalValue.value = undefined)
      },
    })

    const label = useCaption(
      RestrictionNodeType.RECOVERY,
      (days) => `Yes, approximatively ${days} days ago`,
      () => "No, I didn't",
    )

    return {
      label,
      radioValue,
      daysValue,
      currentStep,
    }
  },
})
</script>
