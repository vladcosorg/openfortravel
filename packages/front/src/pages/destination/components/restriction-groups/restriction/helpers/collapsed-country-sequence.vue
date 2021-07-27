<template>
  <span :class="{ [$style.collapsed]: collapsed }">
    <country-label
      v-for="(label, key) in allowedCountryLabels"
      :key="key"
      :value="label"
      :prefix="showSeparator(key) ? ', ' : ''"
      :focused="focusCountryLabel.includes(label)"
      :label="label"
      :regular="regular"
      skip-mapping
      :class="{
        hide: key > collapseCountTrigger,
      }"
    />
    <a
      v-if="collapsed && needsCollapsing"
      :class="$style.uncollapse"
      href="javascript:void(0)"
      @click="collapsed = false"
    >
      ... (show all)</a
    >
  </span>
</template>

<style lang="scss" module>
.collapsed {
  :global(.hide) {
    display: none;
  }
}

.uncollapse {
  text-decoration: none;
}
</style>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import {
  getLabelsForCountryCodes,
  getSortedLabelsForCountryCodes,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { CountryLabel },
  props: {
    allowed: {
      type: Array as PropType<string[]>,
      required: true,
    },
    regular: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
  },
  setup(props) {
    const focusArray = computed(() =>
      Array.isArray(props.focus) ? props.focus : [props.focus],
    )
    const collapseCountTrigger = 5
    const collapsed = ref(true)
    const needsCollapsing = computed(
      () => props.allowed.length >= collapseCountTrigger,
    )
    const focusCountryLabel = computed(() =>
      getLabelsForCountryCodes(focusArray.value),
    )

    const allowedCountriesCount = computed(() => props.allowed.length - 1)
    const allowedCountryLabels = computed(() =>
      getSortedLabelsForCountryCodes(props.allowed, focusArray.value),
    )

    return {
      focusCountryLabel,
      allowedCountriesCount,
      allowedCountryLabels,
      showSeparator,
      collapsed,
      needsCollapsing,
      collapseCountTrigger,
    }
  },
})

const showSeparator = (currentIndex: number): boolean => currentIndex !== 0
</script>
