<template>
  <q-page style="z-index: 2">
    <section-intro :origin-code="originCode" />
    <section-wizard />
    <section-stats v-if="env.isProd || true" :origin-code="originCode" />
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar'
import { defineComponent } from 'vue'

import { generateHreflangTags } from '@/front/src/composables/langhref'
import { useEnv } from '@/front/src/composables/misc'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import SectionIntro from '@/front/src/pages/index/components/section-intro.vue'
import SectionStats from '@/front/src/pages/index/components/section-stats.vue'
import SectionWizard from '@/front/src/pages/index/components/section-wizard.vue'
import { originTransformer } from '@/front/src/router/transformers/origin'
import { getI18nInstance } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {
    SectionStats,
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
      title: getI18nInstance().t('page.index.meta.title', {
        country: getLabelForCountryCode(props.originCode),
      }),
      link: generateHreflangTags(),
    }))

    return {
      ...useEnv(),
    }
  },
})
</script>
