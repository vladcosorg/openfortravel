<template>
  <country-dropdown
    v-model="value"
    standout
    inherit-font-size
    multiple
    label="Citizenship or permanent residence"
    bottom-slots
    stack-label
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
  </country-dropdown>
</template>

<style lang="sass" module>
//.select:not(:global(.q-field--focused)) :global(.q-field__control)
//  //background: none !important
//  cursor: pointer
//  \:global
//    .q-field__native
//      color: var(--q-accent) !important
//      text-decoration: var(--q-accent) !important
//      font-weight: bold
//.select:hover:not(:global(.q-field--focused)) :global(.q-field__control)
//  background: initial !important
.select
  \:global
    .q-field__native
      cursor: pointer
      color: var(--q-accent) !important
      text-decoration: var(--q-accent) !important

    .q-field__control, .q-field__native, .q-field__append
      min-height: auto !important
      height: auto !important
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useModel } from '@/front/src/components/context-field/citizenship/composables'
import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    CountryLabelList,
    Hint,
    CountryDropdown,
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
    const value = useModel()
    return { value, isDefault }
  },
})
</script>
