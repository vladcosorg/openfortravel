<template>
  <router-link :to="{ name: 'index', locale: $i18n.locale }">
    <q-icon
      :class="$style.logo"
      :name="`img:${require('src/assets/logo.svg')}`"
    />
  </router-link>
</template>

<style lang="scss" module>
.lang {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.logo {
  height: auto;
  width: 140px;
  cursor: pointer;
}

.logoBg {
  background-color: $secondary;
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;

  :global {
    animation: 1s ease-out 1s 1 normal forwards running slideInFromLeft;
  }
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LanguageSwitcher from 'layouts/components/the-language-switcher.vue'

export default defineComponent({
  components: { LanguageSwitcher },
  setup() {
    return {}
  },
})
</script>
