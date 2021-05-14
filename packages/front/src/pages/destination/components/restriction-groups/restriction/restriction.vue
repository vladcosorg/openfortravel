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
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent } from '@vue/composition-api'

import Age from '@/front/src/pages/destination/components/restriction-groups/restriction/age.vue'
import Citizenship from '@/front/src/pages/destination/components/restriction-groups/restriction/citizenship.vue'
import DidNotVisitCountries from '@/front/src/pages/destination/components/restriction-groups/restriction/did-not-visit-countries.vue'
import Insurance from '@/front/src/pages/destination/components/restriction-groups/restriction/insurance.vue'
import OnlineApplication from '@/front/src/pages/destination/components/restriction-groups/restriction/online-application.vue'
import Origin from '@/front/src/pages/destination/components/restriction-groups/restriction/origin.vue'
import PcrTest from '@/front/src/pages/destination/components/restriction-groups/restriction/pcr-test.vue'
import Quarantine from '@/front/src/pages/destination/components/restriction-groups/restriction/quarantine.vue'
import Recovery from '@/front/src/pages/destination/components/restriction-groups/restriction/recovery.vue'
import RestrictionItem from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item.vue'
import Vaccinated from '@/front/src/pages/destination/components/restriction-groups/restriction/vaccinated.vue'
import { useAugmentedStore } from '@/shared/src/composables/use-plugins'
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
    [RestrictionNodeType.AGE]: Age,
    [RestrictionNodeType.ONLINE_APPLICATION]: OnlineApplication,
    [RestrictionNodeType.INSURANCE]: Insurance,
  },
  props: {
    restriction: {
      type: Object as PropType<RestrictionNode>,
      required: true,
    },
  },
  setup(props) {
    const store = useAugmentedStore()

    const contextValue = computed(() => {
      const restrictionType = props.restriction.id()
      return store.state.visitorContext[restrictionType]
    })

    return {
      contextValue,
      template: RestrictionItem,
    }
  },
})
</script>
