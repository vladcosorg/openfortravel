<template>
  <div>
    <q-header height-hint="99">
      <q-toolbar class="q-py-md justify-between container">
        <the-menu v-model="menuOpen" />
        <logo class="order-md-first" />
        <the-language-switcher />
      </q-toolbar>
      <!--      <portal-target name="under-header" />-->
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
import { defineComponent, ref } from 'vue'

import TheDrawer from '@/front/src/layouts/components/the-drawer.vue'
import TheLanguageSwitcher from '@/front/src/layouts/components/the-header/the-language-switcher.vue'
import Logo from '@/front/src/layouts/components/the-header/the-logo.vue'
import TheMenu from '@/front/src/layouts/components/the-header/the-menu.vue'

export default defineComponent({
  components: {
    TheMenu,
    TheDrawer,
    TheLanguageSwitcher,
    Logo,
  },
  setup() {
    const menuOpen = ref(false)
    return {
      menuOpen,
    }
  },
})
</script>
