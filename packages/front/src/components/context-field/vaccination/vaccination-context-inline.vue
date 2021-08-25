<template>
  <inline-select v-model="model" :options="options" :loading="isSaving">
    <template #inline-label>
      <vaccine-label regular :value="labelValue" />
    </template>
  </inline-select>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import InlineSelect from '@/front/src/components/context-field/helpers/inline-select.vue'
import { useModel } from '@/front/src/components/context-field/vaccination/composables'
import VaccineLabel from '@/front/src/components/vaccine-label.vue'
import { useVaccinationOptions } from '@/front/src/composables/vaccination'

export default defineComponent({
  components: { VaccineLabel, InlineSelect },
  inheritAttrs: false,
  setup() {
    const options = useVaccinationOptions()

    const { model, isSaving } = useModel()
    const labelValue = computed(() => model.value || undefined)
    return {
      isSaving,
      model,
      options,
      labelValue,
    }
  },
})
</script>
