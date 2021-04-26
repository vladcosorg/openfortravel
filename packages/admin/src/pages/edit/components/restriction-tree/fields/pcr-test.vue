<template>
  <div class="row q-col-gutter-sm">
    <q-input
      v-model="hours"
      style="width: 100px"
      standout=""
      dense
      type="number"
      label="Hours"
    />
    <language-list v-model="languages" label="Languages" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import LanguageList from '@/admin/src/pages/edit/components/restriction-tree/language-list.vue'
import { getCompomentDefaults } from '@/admin/src/pages/edit/composables/use-tree'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'

export default defineComponent({
  components: { LanguageList },
  ...getCompomentDefaults<typeof PcrTest>({ hours: 72, languages: ['en'] }),
})
</script>
