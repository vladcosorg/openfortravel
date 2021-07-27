<template>
  <div :class="['q-gutter-x-md text-caption', $style.links]">
    <router-link
      v-for="(title, url, index) in menuItems"
      :key="index"
      :to="url"
      exact
      >{{ title }}</router-link
    >
  </div>
</template>

<style lang="scss" module>
.links {
  a {
    color: var(--q-primary-subtle);
  }
  a + a {
    padding-left: map-get(map-get($spaces, 'md'), 'x');
    border-left: solid var(--q-primary-subtle) 1px;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { getFooterMenuItems } from '@/front/src/misc/menu'

export default defineComponent({
  setup() {
    const menuItems = computed(getFooterMenuItems)
    return {
      menuItems,
    }
  },
})
</script>
