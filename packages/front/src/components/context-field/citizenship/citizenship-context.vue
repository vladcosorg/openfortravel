<template>
  <generic-select
    v-model="value"
    :options="options"
    multiple
    label="Citizenship or permanent residence"
    bottom-slots
    :clearable="!isDefault"
  >
    <template #selected>
      <country-label-list regular focused :values="value" />
    </template>
    <template #hint>
      <hint>
        Most of the countries apply restrictions based on a citizenship or
        residence.
      </hint>
    </template>
  </generic-select>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useModel } from '@/front/src/components/context-field/citizenship/composables'
import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { useCountryOptions } from '@/front/src/composables/misc'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    GenericSelect,
    CountryLabelList,
    Hint,
  },
  setup() {
    const isDefault = computed(() => {
      const rootStore = useRootStore()
      const origin =
        rootStore.getters.visitorContextWithDefaults[RestrictionNodeType.ORIGIN]
      const citizenshipList =
        rootStore.getters.visitorContextWithDefaults[
          RestrictionNodeType.CITIZENSHIP
        ]

      return citizenshipList.length === 1 && citizenshipList.includes(origin)
    })
    const options = useCountryOptions()
    const value = useModel()
    return { value, isDefault, options }
  },
})
</script>
