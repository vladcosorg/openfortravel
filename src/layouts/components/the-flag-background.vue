<template>
  <div :class="[$style.flagBg]">
    <div :class="[$style.flagBgInner, 'relative-position']">
      <flag
        :class="{
          [$style.firstCountry]: true,
          [$style.halfWidth]: secondCountryCode,
        }"
        :country-code="firstCountryCode"
      />
      <transition
        appear
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutRight"
      >
        <flag
          v-if="secondCountryCode"
          :class="$style.secondCountry"
          :country-code="secondCountryCode"
        />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" module>
.halfWidth {
  width: 50% !important;
}
.flagBg {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  width: 100%;
  height: 250px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));

  :global {
    img {
      object-fit: cover;
      position: absolute;
      height: 100%;
      top: 0;
    }
  }
  .flagBgInner {
    height: 100%;
    width: 100%;
  }

  .firstCountry {
    left: 0;
    width: 100%;
  }

  .secondCountry {
    right: 0;
    mask-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 1) 45%,
      rgba(0, 0, 0, 1) 50%
    );
    z-index: 1;
    width: 50%;
  }
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Flag from 'src/components/flag.vue'

export default defineComponent({
  components: { Flag },
  props: {
    firstCountryCode: {
      type: String,
      required: true,
    },
    secondCountryCode: {
      type: String,
      required: false,
    },
  },
})
</script>
