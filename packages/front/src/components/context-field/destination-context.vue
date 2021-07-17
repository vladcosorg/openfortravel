<template>
  <country-dropdown
    v-model="value"
    :class="$style.select"
    :standout="!inline"
    :borderless="inline"
    dense
    no-ellipsis
    multiple
    stack-label
    :label="label"
    :clearable="!inline"
    v-bind="$attrs"
    :bottom-slots="!inline"
    :inline="inline"
    inherit-font-size
  >
    <template #selected>
      <citizenship-label-short v-if="inline" :value="value" />
      <country-label-list v-else regular :values="value" />
    </template>
    <template v-if="!inline" #hint>
      <hint>
        Most of the countries apply restrictions based on a citizenship or
        residence.
      </hint>
    </template>
  </country-dropdown>
</template>

<style lang="sass" module>
.select
  \:global
    .q-field__native
      color: var(--q-accent)
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import CitizenshipLabelShort from '@/front/src/components/citizenship/citizenship-label-short.vue'
import CountryDropdown from '@/front/src/components/context-field/helpers/country-dropdown.vue'
import Hint from '@/front/src/components/context-field/helpers/hint.vue'
import CountryLabelList from '@/front/src/components/country/country-label-list.vue'
import { createComputedSetter } from '@/front/src/pages/guide/guide-composable'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    CountryLabelList,
    CitizenshipLabelShort,
    Hint,
    CountryDropdown,
  },
  inheritAttrs: false,
  props: {
    inline: {
      type: Boolean,
    },
  },
  setup(props) {
    const defaultCitizenship = computed(
      () =>
        useRootStore().getters.visitorContextWithDefaults[
          RestrictionNodeType.ORIGIN
        ],
    )
    const setter = createComputedSetter(RestrictionNodeType.CITIZENSHIP)

    const label = computed(() => {
      if (props.inline) {
        return
      }

      return `Citizenship or permanent residence  ${
        !value.value ? '(automatic value)' : ''
      }`
    })
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
    return { label, value, defaultCitizenship }
  },
})
</script>
