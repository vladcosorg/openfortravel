<template>
  <div
    class="col-auto column justify-end q-mb-xl q-px-lg relative-position text-center"
  >
    <animated-arrow v-if="showArrow" :class="$style.arrow" />
    <div :class="[$style.intro, 'q-mb-md', 'montserrat']">
      {{ $t('intro.title') }}
    </div>
    <country-list :show-button="showArrow" />
  </div>
</template>

<style lang="scss" module>
.arrow {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
}
.intro {
  font-weight: bold;
  font-size: 1.3rem;
  color: $secondary;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AnimatedArrow from 'layouts/components/the-animated-arrow.vue'
import CountryList from 'layouts/components/the-country-list.vue'

export default defineComponent({
  components: { AnimatedArrow, CountryList },
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>
