<template>
  <q-item class="rounded-borders q-py-md">
    <q-item-section avatar top>
      <q-icon
        v-if="type === 'prerequisite'"
        :name="prerequisiteIcon"
        color="positive"
        size="lg"
      />
      <div v-else class="text-center">
        <q-item-label caption class="q-pt-xs">Step</q-item-label>
        <q-avatar text-color="info" size="xl">{{ index }}</q-avatar>
      </div>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-primary text-pr" v-html="restriction.title" />
      <q-separator dark class="full-width" spaced="" />
      <q-item-label
        class="text-primary-subtle q-pt-xs text-body2"
        style="white-space: pre-line"
        v-html="restriction.subtitle"
      />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { matDone as prerequisiteIcon } from '@quasar/extras/material-icons'
import { defineComponent, PropType } from '@vue/composition-api'

import {
  RestrictionCategory,
  RestrictionInstruction,
} from '@/shared/src/restriction-tree/restriction-node'

export default defineComponent({
  name: 'GroupRestriction',
  components: {},
  props: {
    restriction: {
      type: Object as PropType<RestrictionInstruction>,
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
