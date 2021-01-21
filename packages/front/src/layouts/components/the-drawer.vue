<template>
  <q-drawer v-bind="$attrs" behavior="mobile" v-on="$listeners">
    <q-scroll-area class="fit">
      <q-list padding :class="$style.links">
        <q-item
          v-for="(title, url, index) in menuItems"
          :key="index"
          v-ripple
          clickable
          :to="url"
        >
          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <the-dark-mode-toggle />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss" module>
.links {
  a {
    color: var(--q-color-primary);
  }
  :global(.q-router-link--active) {
    font-weight: bold;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import TheDarkModeToggle from '@/front/src/layouts/components/the-header/the-dark-mode-toggle.vue'
import { getDrawerMenuItems } from '@/front/src/misc/menu'

export default defineComponent({
  components: { TheDarkModeToggle },
  setup() {
    return { menuItems: computed(getDrawerMenuItems) }
  },
})
</script>
