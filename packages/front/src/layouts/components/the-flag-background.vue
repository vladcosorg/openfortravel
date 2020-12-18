<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div :key="firstCountryCode" :class="[$style.flagBg]">
      <div :class="['fit', 'relative-position']">
        <flag
          type="full"
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
  </transition>
</template>

<style lang="scss" module>
.flagBg {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  width: 100%;
  height: 250px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));

  :global {
    .q-img {
      position: absolute;
    }
  }
}

.firstCountry {
  left: 0;
  width: 100%;
  transition: width 0.3s ease;
}

.halfWidth {
  width: 50%;
}

.secondCountry {
  right: 0;
  mask-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0.1) 100%
  );
  z-index: 1;
  width: 50%;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Flag from '@/front/src/components/flag.vue'

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
