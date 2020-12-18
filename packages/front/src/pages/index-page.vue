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
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateOnInteraction } from 'vue-lazy-hydration'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'

export default defineComponent({
  components: {
    TheCountryList: hydrateOnInteraction(TheCountryList),
    Boy: hydrateOnInteraction(
      () => import('@/front/src/layouts/components/the-boy/the-boy.vue'),
    ),
  },
  meta: {},
})
</script>
