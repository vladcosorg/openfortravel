<template>
  <q-page :class="['column', $style.page]">
    <section-intro v-if="true" :origin-code="originCode" />
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

import SectionCountries from '@/front/src/pages/index/components/section-countries.vue'
import SectionIntro from '@/front/src/pages/index/components/section-intro.vue'
import SectionStats from '@/front/src/pages/index/components/section-stats.vue'
import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  meta({ unsafeOriginCode }: { unsafeOriginCode: string }) {
    return {
      title: useI18n().t('page.index.meta.title', {
        nationality: getLabelForCountryCode(unsafeOriginCode),
      }),
    }
  },
  components: {
    SectionCountries,
    SectionStats,
    SectionIntro,
  },
  props: {
    unsafeOriginCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const originCode = useComputedMemorized(() => props.unsafeOriginCode)

    return {
      originCode,
    }
  },
})
</script>
