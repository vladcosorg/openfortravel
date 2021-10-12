<template>
  <div>
    <q-header class="header bg-elevation-1" height-hint="99">
      <q-toolbar class="q-py-md justify-between container">
        <logo />
        <div class="row q-gutter-x-sm q-gutter-md-x-xl">
          <the-language-switcher />
          <the-menu v-model="menuOpen" class="order-md-first" />
        </div>
      </q-toolbar>
    </q-header>
    <the-drawer v-model="menuOpen" />
  </div>
</template>

<style lang="sass" scoped>
.header
  border-bottom: 1px solid var(--q-primary-inverse) !important
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
