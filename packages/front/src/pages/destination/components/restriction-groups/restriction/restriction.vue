<template>
  <component
    :is="restriction.id()"
    :wrapper="template"
    :restriction="restriction"
    :context="contextValue"
  />
</template>

<style lang="scss" module></style>

<script lang="ts">
import type {
  PropType} from '@vue/composition-api';
import {
  computed,
  defineComponent,
  inject
} from '@vue/composition-api'

import Citizenship from '@/front/src/pages/destination/components/restriction-groups/restriction/citizenship.vue'
import DidNotVisitCountries from '@/front/src/pages/destination/components/restriction-groups/restriction/did-not-visit-countries.vue'
import Origin from '@/front/src/pages/destination/components/restriction-groups/restriction/origin.vue'
import PcrTest from '@/front/src/pages/destination/components/restriction-groups/restriction/pcr-test.vue'
import Quarantine from '@/front/src/pages/destination/components/restriction-groups/restriction/quarantine.vue'
import Recovery from '@/front/src/pages/destination/components/restriction-groups/restriction/recovery.vue'
import RestrictionItem from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item.vue'
import Vaccinated from '@/front/src/pages/destination/components/restriction-groups/restriction/vaccinated.vue'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import type { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    RestrictionItem,
    [RestrictionNodeType.CITIZENSHIP]: Citizenship,
    [RestrictionNodeType.ORIGIN]: Origin,
    [RestrictionNodeType.PCR_TEST]: PcrTest,
    [RestrictionNodeType.QUARANTINE]: Quarantine,
    [RestrictionNodeType.VACCINATED]: Vaccinated,
    [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: DidNotVisitCountries,
    [RestrictionNodeType.RECOVERY]: Recovery,
  },
  props: {
    restriction: {
      type: Object as PropType<RestrictionNode>,
      required: true,
    },
  },
  setup(props) {
    const store = inject(StoreKey) as StoreModule

    const contextValue = computed(() => {
      const restrictionType = props.restriction.id()
      return store.getters.visitorContext[restrictionType]
    })

    return {
      contextValue,
      template: RestrictionItem,
    }
  },
})
</script>