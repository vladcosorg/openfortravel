<template>
  <router-link :class="$style.link" :to="route">
    <img
      svg-inline
      :class="[$style.logo]"
      style="height: 60px"
      src="src/assets/logo.svg"
    />
  </router-link>
</template>

<style lang="scss" module>
.logo {
  //background-color: $secondary;
  //height: auto;
  //width: 140px;
  cursor: pointer;
  &:focus {
    outline: none;
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
