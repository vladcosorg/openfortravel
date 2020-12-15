<template>
  <q-page :class="['column fit justify-around no-wrap', $style.page]">
    <div class="text-h6 text-center q-mb-xl">
      {{ $t('page.index.hero') }}
    </div>
    <boy :class="['q-mb-xl']" />
    <div :class="['relative-position', 'text-center']">
      <the-country-list />
    </div>
  </q-page>
</template>

<style lang="scss" module>
.page {
  z-index: 2;
}
.arrow {
  position: absolute;
  //top: 0;
  //left: 0;
  //width: 100%;
  //transform: translateY(-100%);
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import TheCountryList from 'src/layouts/components/the-country-list/the-country-list.vue'

export default defineComponent({
  components: {
    TheCountryList,
    Boy: hydrateWhenIdle(
      () => import('src/layouts/components/the-boy/the-boy.vue'),
      {},
    ),
  },
  name: 'PageIndex',
  meta: {},
})
</script>
