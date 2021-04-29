<template>
  <q-item class="rounded-borders q-py-md">
    <q-item-section avatar top>
      <q-icon
        v-if="type === 'prerequisite'"
        :name="prerequisiteIcon"
        color="info"
        size="lg"
      />
      <div v-else class="text-center">
        <q-item-label caption class="q-pt-xs">Step</q-item-label>
        <q-avatar text-color="info" size="xl">{{ index }}</q-avatar>
      </div>
    </q-item-section>

    <restriction :restriction="restriction" />
  </q-item>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { matChevronRight as prerequisiteIcon } from '@quasar/extras/material-icons'
import { defineComponent, PropType } from '@vue/composition-api'

import Restriction from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction.vue'
import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'

export default defineComponent({
  name: 'GroupRestriction',
  components: { Restriction },
  props: {
    restriction: {
      type: Object as PropType<RestrictionNode>,
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
    return { prerequisiteIcon }
  },
})
</script>
