<template>
  <div :class="['col-2  text-center']">
    <div class="row items-center justify-center">
      <portal-target name="top-left" class="col" />
      <logo class="col-auto" />
      <div class="col row justify-center">
        <language-switcher />
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
import { PortalTarget } from 'portal-vue'
import LazyHydrate from 'vue-lazy-hydration'

import LanguageSwitcher from 'src/layouts/components/the-language-switcher.vue'
import Logo from 'src/layouts/components/the-logo.vue'

export default defineComponent({
  components: { LanguageSwitcher, Logo, LazyHydrate, PortalTarget },
  setup() {
    return {}
  },
})
</script>
