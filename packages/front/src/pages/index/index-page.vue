<template>
  <q-page :class="['column', $style.page]">
    <section-intro :origin-code="originCode" />
    <section-stats :origin-code="originCode" />
    <section-countries />
  </q-page>
</template>

<style lang="scss" module>
.page {
  z-index: 2;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'

import SectionCountries from '@/front/src/pages/index/components/section-countries.vue'
import SectionIntro from '@/front/src/pages/index/components/section-intro.vue'
import SectionStats from '@/front/src/pages/index/components/section-stats.vue'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  meta({ originCode }: { originCode: string }) {
    return {
      title: useI18n().t('page.index.meta.title', {
        nationality: getLabelForCountryCode(originCode),
      }),
    }
  },
  components: {
    SectionIntro: hydrateWhenIdle(SectionIntro),
    SectionStats: hydrateWhenVisible(SectionStats),
    SectionCountries: hydrateWhenVisible(SectionCountries),
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
})
</script>
