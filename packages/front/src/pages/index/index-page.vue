<template>
  <q-page class="column" style="z-index: 2">
    <section-intro :origin-code="originCode" />
    <section-wizard />
    <!--    <section-stats :origin-code="originCode" />-->
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SectionIntro from '@/front/src/pages/index/components/section-intro.vue'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import SectionWizard from '@/front/src/pages/index/components/section-wizard.vue'

export default defineComponent({
  meta({ originCode }: { originCode: string }) {
    return {
      title: useI18n().t('page.index.meta.title', {
        nationality: getLabelForCountryCode(originCode),
      }),
    }
  },
  components: {
    SectionWizard,
    SectionIntro,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
})
</script>
