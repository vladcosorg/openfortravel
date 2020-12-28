<template>
  <router-link
    :class="$style.link"
    :to="{ name: 'index', locale: $i18n.locale }"
  >
    <img
      svg-inline
      :class="[$style.logo, 'q-pa-md']"
      src="src/assets/logo.svg"
    />
  </router-link>
</template>

<style lang="scss" module>
.logo {
  background-color: $secondary;
  height: auto;
  width: 140px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
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
