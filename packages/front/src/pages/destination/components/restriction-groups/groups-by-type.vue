<template>
  <div>
    <q-list v-for="(group, key) in restrictionsGroups" :key="key">
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
  border: solid 1px var(--q-color-positive);
}
</style>

<script lang="ts">
import {
  matKeyboardArrowDown as expansionIcon,
  matCheck as availableIcon,
  matCheckCircle as successIcon,
  matInfo as infoIcon,
} from '@quasar/extras/material-icons'
import type { PropType } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import GroupScoreWords from '@/front/src/pages/destination/components/restriction-groups/group-score-words.vue'
import GroupScore from '@/front/src/pages/destination/components/restriction-groups/group-score.vue'
import GroupsByCategory from '@/front/src/pages/destination/components/restriction-groups/groups-by-category.vue'
import { RestrictionGroup } from '@/shared/src/restriction-tree/restriction-group'

export default defineComponent({
  components: { CountryLabel, GroupsByCategory, GroupScoreWords, GroupScore },
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
  },
  setup() {
    return { expansionIcon, successIcon, availableIcon, infoIcon }
  },
})
</script>
