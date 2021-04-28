<template>
  <component
    :is="restriction.id()"
    v-if="isStandalone"
    :template="template"
    :restriction="restriction"
    :context="contextValue"
  />
  <restriction-item v-else>
    <template #title>
      <div v-html="instruction.title" />
    </template>
    <template #subtitle><div v-html="instruction.subtitle" /></template>
  </restriction-item>
</template>

<style lang="scss" module></style>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import Citizenship from '@/front/src/pages/destination/components/restriction-groups/restriction/citizenship.vue'
import Origin from '@/front/src/pages/destination/components/restriction-groups/restriction/origin.vue'
import RestrictionItem from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

const standaloneTypes = {
  [RestrictionNodeType.CITIZENSHIP]: Citizenship,
  [RestrictionNodeType.ORIGIN]: Origin,
}
export default defineComponent({
  components: {
    RestrictionItem,
    ...standaloneTypes,
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

    const instruction = computed(() =>
      props.restriction.instruction(store.getters.visitorContext),
    )
    const isStandalone = computed(
      () => props.restriction.id() in standaloneTypes,
    )
    return {
      contextValue,
      isStandalone,
      instruction,
      template: RestrictionItem,
    }
  },
})
</script>
