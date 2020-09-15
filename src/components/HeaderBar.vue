<template>
  <div :class="['col-2 column']">
    <div class="col-auto relative-position">
      <div :class="$style.logoBg" />
      <router-link to="/ro">
        <q-icon
          :class="$style.logo"
          :name="`img:${require('src/assets/logo.svg')}`"
        />
      </router-link>
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

@keyframes:global (slideInFromLeft) {
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

  :global {
    animation: 1s ease-out 1s 1 normal forwards running slideInFromLeft;
  }
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LanguageSwitcher from 'components/LanguageSwitcher.vue'

export default defineComponent({
  components: { LanguageSwitcher },
  setup() {
    return {}
  },
})
</script>
