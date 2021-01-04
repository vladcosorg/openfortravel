<template>
  <q-header class="q-py-sm" height-hint="82">
    <q-toolbar>
      <q-btn flat dense round :icon="menu" @click="$emit('input', true)" />
      <q-space />
      <logo />
      <q-space />
      <language-switcher />
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" module>
.logo {
  height: auto;
  cursor: pointer;
}
</style>
<script lang="ts">
import { matMenu as menu } from '@quasar/extras/material-icons'
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import LanguageSwitcher from '@/front/src/layouts/components/the-language-switcher.vue'
import Logo from '@/front/src/layouts/components/the-logo.vue'

export default defineComponent({
  components: {
    LanguageSwitcher: hydrateWhenIdle(LanguageSwitcher),
    Logo: hydrateWhenIdle(Logo),
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      menu,
    }
  },
})
</script>
