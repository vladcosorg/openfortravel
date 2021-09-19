<template>
  <component :is="wrapper" :restriction="restriction">
    <template v-if="!restriction.options.earlyReleaseDays" #title>
      <span
        v-html="
          tl('page.destination.rs.quarantine.title.earlyRelease', {
            days: restriction.options.days,
          })
        "
      />
    </template>

    <template v-else #title>
      <span
        v-html="
          tl('page.destination.rs.quarantine.title.noEarlyRelease', {
            days: restriction.options.days,
          })
        "
      />
    </template>
    <template #subtitle>
      <p
        v-html="
          tl('page.destination.rs.quarantine.body.firstLine', {
            days: restriction.options.days,
          })
        "
      />

      <p
        v-if="restriction.options.earlyReleaseDays"
        v-html="
          tl('page.destination.rs.quarantine.body.earlyRelease', {
            days: restriction.options.days,
          })
        "
      />

      <p
        v-else
        v-html="
          tl('page.destination.rs.quarantine.body.noEarlyRelease', {
            days: restriction.options.days,
          })
        "
      />
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import CollapsedCountrySequence from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/collapsed-country-sequence.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Languages from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/languages.vue'
import TitleCountry from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/title-country.vue'
import { sharedProps } from '@/front/src/pages/destination/composables/restriction-item'
import type { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'

import type { PropType } from 'vue'

export default defineComponent({
  components: {
    Languages,
    Language,
    CollapsedCountrySequence,
    TitleCountry,
  },
  mixins: [sharedProps],
  props: {
    restriction: {
      type: Object as PropType<Quarantine>,
      required: true,
    },
  },
  setup() {
    const { tl } = useCustomI18n()
    return { tl }
  },
})
</script>
