<template>
  <q-item
    class="rounded-borders bg-elevation-1 q-py-lg"
    :clickable="!isExpanded"
    @click="isExpanded = !isExpanded"
  >
    <q-item-section avatar class="justify-center items-center">
      <q-icon
        v-if="type === 'prerequisite'"
        :name="prerequisiteIcon"
        color="positive"
        size="lg"
      />
      <div v-else class="text-center text-h4 text-positive">
        {{ index }}
      </div>
    </q-item-section>

    <restriction :restriction="restriction" />
    <q-tooltip v-if="!isExpanded"
      >Click to show full restriction text</q-tooltip
    >
    <q-item-section v-if="!isExpanded" side>
      <q-icon :name="showMoreIcon" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {
  matCheck as prerequisiteIcon,
  matUnfoldMore as showMoreIcon,
} from '@quasar/extras/material-icons'
import { PropType, defineComponent, ref, provide } from 'vue'

import Restriction from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction.vue'
import {
  RestrictionCategory,
  AbstractRestrictionNode,
} from '@/shared/src/restriction-tree/abstract-restriction-node'

export default defineComponent({
  name: 'GroupRestriction',
  components: { Restriction },
  props: {
    restriction: {
      type: Object as PropType<AbstractRestrictionNode>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<RestrictionCategory>,
      required: true,
    },
  },
  setup() {
    const isExpanded = ref(false)
    provide('isExpanded', isExpanded)
    return {
      prerequisiteIcon,
      isExpanded,
      showMoreIcon,
    }
  },
})
</script>
