<template>
  <div>
    <q-list
      v-for="(group, key) in restrictionsGroups"
      :key="key"
      bordered
      class="rounded-borders q-mb-lg"
    >
      <q-expansion-item
        :value="available"
        :expand-icon="expansionIcon"
        header-class="q-pa-md bg-elevation-1"
      >
        <template #header>
          <q-item-section>
            <group-score-words :score="group.score" />
            <group-score :score="group.score" />
          </q-item-section>
          <q-item-section side :class="`text-${available ? 'positive' : 'negative'}`">
            <q-item-label>{{ typeLabel }}</q-item-label>
          </q-item-section>
        </template>

        <groups-by-category
          label="Provided that"
          :restrictions="group.group.prerequisite"
          type="prerequisite"
        />
        <groups-by-category label="Do" :restrictions="group.group.action" type="action" />

        <q-item v-if="available">
          <q-item-section class="text-subtitle1 q-pa-lg text-center items-center">
            <q-item-label>
              That's it! Provided that you've met all requirements above, you should be able to
              enter the country.</q-item-label
            >
            <q-icon :name="successIcon" color="positive" size="xl" class="q-mt-lg" />
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import {
  matKeyboardArrowDown as expansionIcon,
  matThumbUp as successIcon,
} from '@quasar/extras/material-icons'
import { defineComponent, PropType } from '@vue/composition-api'

import GroupScoreWords from '@/front/src/pages/destination/components/restriction-groups/group-score-words.vue'
import GroupScore from '@/front/src/pages/destination/components/restriction-groups/group-score.vue'
import GroupsByCategory from '@/front/src/pages/destination/components/restriction-groups/groups-by-category.vue'
import { RestrictionsGroupesWithScore } from '@/shared/src/restriction-tree/entry-ways'

export default defineComponent({
  components: { GroupsByCategory, GroupScoreWords, GroupScore },
  props: {
    restrictionsGroups: {
      type: Array as PropType<RestrictionsGroupesWithScore>,
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
  },
  setup() {
    return { expansionIcon, successIcon }
  },
})
</script>