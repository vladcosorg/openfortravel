<template>
  <div class="col-auto column justify-end q-mb-xl q-px-lg relative-position">
    <animated-arrow v-if="showArrow" :class="$style.arrow" />
    <div :class="[$style.intro, 'q-mb-md']">
      {{ $t('intro.title') }}
    </div>
    <country-list />
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
import CountryList from 'components/CountryList.vue'
import AnimatedArrow from 'components/AnimatedArrow.vue'

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
