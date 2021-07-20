<template>
  <generic-select
    v-model="modelValue"
    label="Vaccination status"
    :options="options"
    :use-input="false"
    bottom-slots
    :multiple="false"
  >
    <template #selected>
      <vaccine-label regular :value="labelValue" />
    </template>
    <template #hint>
      <hint>
        The fact whether you're vaccinated or not dramatically changes the
        restrictions applied to you. <br />
        Moreover, certain vaccines are not approved in some countries, thus if
        you're vaccinated with an <b>unapproved</b> vaccine, you may not benefit
        from priviledges offered to vaccinated travellers.
      </hint>
    </template>
  </generic-select>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import { useModel } from '@/front/src/components/context-field/vaccination/composables'
import VaccineLabel from '@/front/src/components/vaccine-label.vue'
import { useVaccinationOptions } from '@/front/src/composables/vaccination'

export default defineComponent({
  components: { VaccineLabel, GenericSelect, Hint },
  emits: ['update:modelValue'],
  setup() {
    const modelValue = useModel()
    const labelValue = computed(() => modelValue.value || undefined)
    const options = useVaccinationOptions()
    return {
      modelValue,
      labelValue,
      options,
    }
  },
})
</script>
