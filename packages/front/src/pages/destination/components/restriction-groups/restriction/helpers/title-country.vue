<template>
  <span>
    <span class="text-accent">{{ focusCountryLabel }}</span>
    <span v-if="allowedCountriesCount > 0">
      or
      {{ allowedCountriesCount }} other countries
    </span>
  </span>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { matHelp as helpIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent, PropType } from '@vue/composition-api'

import {
  getLabelForCountryCode,
  getSortedLabelsForCountryCodes,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {},
  props: {
    allowed: {
      type: Array as PropType<string[]>,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const focusCountryLabel = computed(() =>
      getLabelForCountryCode(props.focus),
    )

    const allowedCountriesCount = computed(() => props.allowed.length - 1)
    const allowedCountryLabels = computed(() =>
      getSortedLabelsForCountryCodes(props.allowed, undefined, [
        focusCountryLabel.value,
      ]).join(', '),
    )

    return {
      focusCountryLabel,
      allowedCountriesCount,
      allowedCountryLabels,
      helpIcon,
    }
  },
})
</script>
