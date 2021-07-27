<template>
  <router-link :class="$style.link" :to="homeURL">
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
      fill: var(--q-primary);
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { getMenuItemURL } from '@/front/src/misc/menu'

export default defineComponent({
  setup() {
    return {
      homeURL: computed(() => getMenuItemURL('index')),
    }
  },
})
</script>
