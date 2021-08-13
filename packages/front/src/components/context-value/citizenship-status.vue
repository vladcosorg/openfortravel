<template>
  <citizenship-context inline />
</template>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { getOriginLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import {
  matEdit as editIcon,
  matHelpOutline as helpIcon,
  matArrowDropDown as downIcon,
} from '@quasar/extras/material-icons'
import { computed, defineComponent } from 'vue'

import CitizenshipContext from '@/front/src/components/context-field/citizenship/citizenship-context.vue'

export default defineComponent({
  components: { CitizenshipContext },
  props: {},
  setup() {
    const store = useRootStore()
    const value = computed(() => {
      let citizenshipList =
        store.getters.visitorContextWithDefaults[
          RestrictionNodeType.CITIZENSHIP
        ]

      const firstCitizenship = getOriginLabelForCountryCode(citizenshipList[0])

      if (citizenshipList.length === 1) {
        return firstCitizenship
      }

      return `${firstCitizenship} (and ${
        citizenshipList.length - 1
      } more countries)`
    })

    return { value, editIcon, helpIcon, downIcon }
  },
})
</script>
