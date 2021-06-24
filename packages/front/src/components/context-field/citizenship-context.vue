<template>
  <country-dropdown
    v-model="value"
    multiple
    stack-label
    placeholder="dawdw"
    :label="`Citizenship ${!value ? '(automatic value)' : ''}`"
    clearable
    v-bind="$attrs"
    bottom-slots
  >
    <template v-if="!value" #selected
      ><country-label regular :value="defaultCitizenship"
    /></template>
    <template #hint>
      <hint>
        Most of the countries apply restrictions based on a citizenship.
      </hint>
    </template>
  </country-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { CountryLabel, Hint, CountryDropdown },
  inheritAttrs: false,
  props: {},
  setup() {
    const defaultCitizenship = computed(
      () =>
        useRootStore().getters.visitorContextWithDefaults[
          RestrictionNodeType.ORIGIN
        ],
    )
    const setter = createComputedSetter(RestrictionNodeType.CITIZENSHIP)

    const value = computed<typeof setter.value>({
      get() {
        return setter.value
      },
      set(value) {
        if (!value) {
          setter.value = undefined
          return
        }

        setter.value = value
      },
    })
    return { value, defaultCitizenship }
  },
})
</script>
