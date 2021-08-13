<template>
  <vaccination-context inline />
</template>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { vaccineLabels } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { matEdit as editIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent } from 'vue'

import CitizenshipContext from '@/front/src/components/context-field/citizenship/citizenship-context.vue'
import VaccinationContext from '@/front/src/components/context-field/vaccination/vaccination-context.vue'
import Context from '@/front/src/components/context-value/context.vue'

export default defineComponent({
  components: { VaccinationContext, CitizenshipContext, Context },
  props: {},
  setup() {
    const store = useRootStore()
    const value = computed(() => {
      const status = store.state.visitorContext[RestrictionNodeType.VACCINATED]
      return status !== undefined
        ? `vaccinated with ${vaccineLabels[status.brand]}`
        : 'not vaccinated'
    })

    return { value, editIcon }
  },
})
</script>
