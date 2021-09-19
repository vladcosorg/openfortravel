<template>
  <i18n-l
    v-if="languages && languages.length > 0"
    keypath="components.requiredLanguages.languageList"
    tag="p"
  >
    <template #langs>
      <seq v-slot="{ item }" :items="languages" conjunction="or"
        ><language :code="item"
      /></seq>
    </template>
  </i18n-l>
  <p v-else>
    {{ $t('components.requiredLanguages.noInfo') }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import I18nL from '@/front/src/modules/i18n/i18n-l.vue'
import Language from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/language.vue'
import Seq from '@/front/src/pages/destination/components/restriction-groups/restriction/helpers/seq.vue'

import type { PropType } from 'vue'

export default defineComponent({
  components: { I18nL, Seq, Language },
  props: {
    languages: {
      type: Array as PropType<string[]>,
      required: false,
    },
  },
})
</script>
