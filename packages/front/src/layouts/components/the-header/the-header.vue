<template>
  <div>
    <q-header class="q-py-sm" height-hint="82">
      <q-toolbar class="justify-between">
        <the-menu v-model="menuOpen" />
        <logo class="order-md-first" />
        <the-language-switcher />
      </q-toolbar>
    </q-header>
    <the-drawer v-model="menuOpen" />
  </div>
</template>

<style lang="scss" module>
.logo {
  height: auto;
  cursor: pointer;
}
</style>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import TheDrawer from '@/front/src/layouts/components/the-drawer.vue'
import TheLanguageSwitcher from '@/front/src/layouts/components/the-header/the-language-switcher.vue'
import Logo from '@/front/src/layouts/components/the-header/the-logo.vue'
import TheMenu from '@/front/src/layouts/components/the-header/the-menu.vue'

export default defineComponent({
  components: {
    TheMenu,
    TheDrawer,
    TheLanguageSwitcher: hydrateWhenIdle(TheLanguageSwitcher),
    Logo: hydrateWhenIdle(Logo),
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const menuOpen = ref(false)
    return {
      menuOpen,
    }
  },
})
</script>
