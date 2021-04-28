<template>
  <span :class="{ [$style.collapsed]: collapsed }">
    <b
      v-for="(label, key) in allowedCountryLabels"
      :key="key"
      :class="{
        'text-accent': focusCountryLabel === label,
        hide: key > 5,
      }"
      >{{ showSeparator(key) ? ', ' : '' }}{{ label }}</b
    >
    <a
      v-if="collapsed"
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
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'

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
    const collapsed = ref(true)
    const focusCountryLabel = computed(() =>
      getLabelForCountryCode(props.focus),
    )

    const allowedCountriesCount = computed(() => props.allowed.length - 1)
    const allowedCountryLabels = computed(() =>
      getSortedLabelsForCountryCodes(props.allowed, [props.focus]),
    )

    return {
      focusCountryLabel,
      allowedCountriesCount,
      allowedCountryLabels,
      showSeparator,
      collapsed,
    }
  },
})

const showSeparator = (currentIndex: number): boolean => currentIndex !== 0
</script>
