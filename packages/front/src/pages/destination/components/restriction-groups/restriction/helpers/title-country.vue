<template>
  <span v-if="allowed.includes(focus)">
    <span class="text-accent">{{ focusCountryLabel }}</span>
    <span v-if="allowedCountriesCount > 0">
      or of any other
      {{ allowedCountriesCount }} countries
    </span>
  </span>
  <span v-else>
    one of the {{ allowedCountriesCount }} allowed countries (<country
      :code="focus"
    />
    is not one of them)
  </span>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import Country from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/country.vue'
import {
  getLabelForCountryCode,
  getSortedLabelsForCountryCodes,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { Country },
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
    }
  },
})
</script>
