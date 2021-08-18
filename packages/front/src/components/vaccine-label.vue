<template>
  <span>
    <span v-if="!noPrefix && value" style="font-weight: normal">
      vaccinated with
    </span>
    <span :class="{ 'text-bold': !regular, 'text-capitalize': capitalize }">
      {{ label }}
    </span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { useRootStore } from '@/shared/src/composables/use-plugins'
import {
  getVaccineLabel,
  VaccineBrand,
} from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  inheritAttrs: false,
  props: {
    regular: {
      type: Boolean,
    },
    value: {
      type: String as PropType<VaccineBrand>,
      required: false,
    },
    noPrefix: {
      type: Boolean,
    },
    capitalize: {
      type: Boolean,
    },
    useGlobalValue: {
      type: Boolean,
    },
  },
  setup(props) {
    const internalValue = computed(() => {
      if (props.useGlobalValue) {
        const globalValue =
          useRootStore().getters.visitorContextWithDefaults[
            RestrictionNodeType.VACCINATED
          ]

        return globalValue ? globalValue.brand : undefined
      }

      return props.value
    })
    const label = computed(() => getVaccineLabel(internalValue.value))
    return { label }
  },
})
</script>
