<template>
  <div :class="['col-2  text-center']">
    <div class="row items-center justify-center">
      <div class="col"></div>
      <logo class="col-auto" />
      <div class="col row justify-center">
        <language-switcher :class="[$style.lang]" />
      </div>
    </div>
  </div>
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
import LanguageSwitcher from 'layouts/components/the-language-switcher.vue'
import Logo from 'layouts/components/the-logo.vue'
import LazyHydrate from 'vue-lazy-hydration'

export default defineComponent({
  components: { LanguageSwitcher, Logo, LazyHydrate },
  setup() {
    return {}
  },
})
</script>
