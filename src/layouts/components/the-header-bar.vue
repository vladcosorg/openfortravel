<template>
  <div :class="['col-2 column text-center']">
    <div class="col-auto relative-position">
      <logo />
      <language-switcher :class="[$style.lang, 'q-pr-lg']" />
    </div>
  </div>
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
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LanguageSwitcher from 'layouts/components/the-language-switcher.vue'
import Logo from 'layouts/components/the-logo.vue'

export default defineComponent({
  components: { LanguageSwitcher, Logo },
  setup() {
    return {}
  },
})
</script>
