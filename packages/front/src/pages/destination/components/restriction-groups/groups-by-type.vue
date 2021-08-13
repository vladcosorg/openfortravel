<template>
  <div class="q-gutter-y-lg q-pt-md">
    <q-list v-for="(group, key) in restrictionsGroups" :key="key">
      <q-separator v-if="key > 0" color="elevated-1" class="q-my-xl" />
      <q-item v-if="showHeader">
        <q-item-section>
          <q-item-label class="text-h6">Option #{{ key + 1 }}</q-item-label>
          <group-score-words :score="group.rating" />
          <group-score :score="group.rating" />
        </q-item-section>
        <q-item-section side>
          <q-chip v-if="available && key === 0" square text-color="positive">
            <q-avatar :icon="availableIcon" color="teal" text-color="white" />
            Best option
          </q-chip>
          <q-chip v-else-if="available" square text-color="positive">
            <q-avatar :icon="availableIcon" text-color="positive" />
            {{ typeLabel }}
          </q-chip>
          <q-chip v-else square text-color="negative"> {{ typeLabel }}</q-chip>
        </q-item-section>
      </q-item>
      <div class="q-col-gutter-y-xl">
        <groups-by-category
          v-if="group.prerequisites.length"
          label="What you need to make sure:"
          :restrictions="group.prerequisites"
          type="prerequisite"
        />

        <groups-by-category
          v-if="group.actions.length"
          label="What you need to do:"
          :restrictions="group.actions"
          type="action"
        />
      </div>

      <q-item
        v-if="available"
        class="rounded-borders bg-elevation-1 q-py-md q-mt-md bg-positive"
      >
        <q-item-section avatar top class="justify-center">
          <q-icon :name="successIcon" color="primary-inverse" size="xl" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-primary-inverse">
            That's it! Bon Voyage and get there safe!</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="scss" module>
.bestOption {
  border: solid 1px var(--q-positive);
}
</style>

<script lang="ts">
import {
  matCheck as availableIcon,
  matCheckCircle as successIcon,
} from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'

import GroupScoreWords from '@/front/src/pages/destination/components/restriction-groups/group-score-words.vue'
import GroupScore from '@/front/src/pages/destination/components/restriction-groups/group-score.vue'
import GroupsByCategory from '@/front/src/pages/destination/components/restriction-groups/groups-by-category.vue'
import { RestrictionGroup } from '@/shared/src/restriction-tree/restriction-group'

import type { PropType } from 'vue'

export default defineComponent({
  components: { GroupsByCategory, GroupScoreWords, GroupScore },
  props: {
    restrictionsGroups: {
      type: Array as PropType<RestrictionGroup[]>,
      required: true,
    },
    typeLabel: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    showHeader: {
      type: Boolean,
    },
  },
  setup() {
    return { successIcon, availableIcon }
  },
})
</script>
