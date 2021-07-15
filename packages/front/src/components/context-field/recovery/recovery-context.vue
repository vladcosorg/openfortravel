<template>
  <generic-select
    v-model="selectValue"
    :options="options"
    label="Have you had COVID-19?"
    bottom-slots
    disable-input
  >
    <template #hint>
      <hint>
        Even if you are not vaccinated, some countries would ease certain
        restrictions, if you've recovered recently from COVID-19 and thus have
        antibodies.
      </hint>
    </template>
    <template #after
      ><q-input
        v-model.number.lazy="inputValue"
        debounce="1000"
        label="Days ago"
        standout=""
        :disable="!selectValue"
        placeholer="days"
        type="number"
        style="width: 100px"
      />
    </template>
  </generic-select>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import { useModel } from '@/front/src/components/context-field/recovery/composables'

export default defineComponent({
  components: { Hint, GenericSelect },
  inheritAttrs: false,
  setup() {
    const internalValue = useModel()
    const options = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ]
    const inputValue = computed({
      get() {
        return Number.isInteger(internalValue.value)
          ? (internalValue.value as number)
          : 30
      },
      set(value: number) {
        internalValue.value = value
      },
    })

    const selectValue = computed({
      get() {
        return !(internalValue.value === undefined)
      },
      set(value) {
        value === true
          ? (internalValue.value = inputValue.value)
          : (internalValue.value = undefined)
      },
    })
    return { inputValue, selectValue, options }
  },
})
</script>
