<template>
  <q-page class="column" style="z-index: 2">
    <section-intro :origin-code="originCode" />
    <section-wizard />
    <!--    <section-stats :origin-code="originCode" />-->
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar'
import { defineComponent } from 'vue'

import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import SectionIntro from '@/front/src/pages/index/components/section-intro.vue'
import SectionWizard from '@/front/src/pages/index/components/section-wizard.vue'
import { originTransformer } from '@/front/src/router/transformers/origin'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
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
  setup(props) {
    useContextParser({
      originSlug: originTransformer,
    })
    useMeta(() => ({
      title: useI18n().t('page.index.meta.title', {
        nationality: getLabelForCountryCode(props.originCode),
      }),
    }))
  },
})
</script>
