<template>
  <country-dropdown
    v-model="value"
    multiple
    label="Citizenship"
    clearable
    v-bind="$attrs"
    bottom-slots
  >
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
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Hint, CountryDropdown },
  inheritAttrs: false,
  props: {},
  setup() {
    const store = useRootStore()
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
    return { value }
  },
})
</script>
