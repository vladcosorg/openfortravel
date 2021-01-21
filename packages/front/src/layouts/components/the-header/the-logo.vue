<template>
  <router-link :class="$style.link" :to="route">
    <img
      svg-inline
      :class="[$style.logo]"
      style="height: 60px"
      src="../../../assets/logo.svg"
    />
  </router-link>
</template>

<style lang="scss" module>
.logo {
  cursor: pointer;
  &:focus {
    outline: none;
  }
  :global {
    #Layer_1-2 path:first-child {
      fill: var(--q-color-primary);
    }
  }
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { getCurrentOriginSlug } from '@/front/src/misc/country-decider'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  setup() {
    const route = {
      name: 'index-targeted',
      locale: useI18n().locale,
      originSlug: getCurrentOriginSlug(),
    }
    return {
      route,
    }
  },
})
</script>
