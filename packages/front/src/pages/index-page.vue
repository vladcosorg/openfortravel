<template>
  <q-page :class="['column fit justify-around no-wrap', $style.page]">
    <div
      :class="[$style.hero, 'text-h5  text-center q-mb-xl']"
      v-html="$t('page.index.hero')"
    />
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
.hero span {
  font-weight: bold;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import Boy from '@/front/src/layouts/components/the-boy/the-boy.vue'
import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'

export default defineComponent({
  components: {
    TheCountryList: hydrateWhenIdle(TheCountryList),
    Boy: hydrateWhenIdle(Boy),
  },
  meta: {},
})
</script>
