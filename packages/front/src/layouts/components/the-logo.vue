<template>
  <router-link :to="{ name: 'index', locale: $i18n.locale }">
    <img svg-inline :class="$style.logo" src="src/assets/logo.svg" />
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

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
