<template>
  <router-link :to="{ name: 'index', locale: $i18n.locale }">
    <q-icon :class="$style.logo" :name="`img:${require('src/assets/logo.svg')}`" />
  </router-link>
</template>

<style lang="scss" module>
.logo {
  height: auto;
  width: 140px;
  cursor: pointer;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import LanguageSwitcher from 'src/layouts/components/the-language-switcher.vue'

export default defineComponent({
  components: { LanguageSwitcher },
  setup() {
    return {}
  },
})
</script>
