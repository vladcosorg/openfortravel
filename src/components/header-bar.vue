<template>
  <div :class="['col-2 column text-center']">
    <div class="col-auto relative-position">
      <div :class="$style.logoBg" />
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

@keyframes slideInFromLeft {
  0% {
    width: 100vw;
  }
  100% {
    width: 140px;
  }
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
  animation: slideInFromLeft 1s ease-out 1s 1 normal forwards;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LanguageSwitcher from 'components/language-switcher.vue'
import Logo from 'components/logo.vue'

export default defineComponent({
  components: { LanguageSwitcher, Logo },
  setup() {
    return {}
  },
})
</script>
