<template>
  <inline-select v-model="model" :options="options" multiple>
    <template #inline-label>
      <country-label-list regular :values="model" />
    </template>
  </inline-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useModel } from '@/front/src/components/context-field/citizenship/composables'
import InlineSelect from '@/front/src/components/context-field/helpers/inline-select.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { useCountryOptions } from '@/front/src/composables/misc'

export default defineComponent({
  components: {
    InlineSelect,
    CountryLabelList,
  },
  inheritAttrs: false,
  setup() {
    const model = useModel()
    const options = useCountryOptions()

    return { model, options }
  },
})
</script>
