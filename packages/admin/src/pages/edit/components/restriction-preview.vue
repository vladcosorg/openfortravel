<template>
  <div class="q-gutter-y-lg q-ma-sm">
    <h5>Result</h5>
    <q-list v-for="(group, key) in groups" :key="key">
      <div class="text-center" />
      <q-item>
        <q-item-section avatar>
          <q-chip
            square
            color="indigo-7"
            text-color="white"
            style="border: 2px solid gray"
          >
            OR
          </q-chip>
        </q-item-section>

        <q-item-section class="bg-blue-grey-8 rounded-borders">
          <q-list>
            <q-item v-for="(item, subkey) in group" :key="subkey">
              <q-item-section>
                <restriction :restriction="item" />
                <q-chip
                  v-if="subkey < group.length - 1"
                  class="q-mt-lg"
                  square
                  color="indigo-10"
                  text-color="white"
                >
                  AND
                </q-chip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import Restriction from '@/admin/src/pages/edit/components/preview/restriction.vue'
import { Destination } from '@/shared/src/api/destinations/models'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'

export default defineComponent({
  components: { Restriction },
  props: {
    value: {
      type: Object as PropType<Destination>,
      required: true,
    },
  },
  setup(props) {
    const groups = computed(() =>
      new RestrictionGroupCollection(props.value.restrictions)
        .getAvailableGroups()
        .map((groups) => [...groups.prerequisites, ...groups.actions]),
    )
    return { groups }
  },
})
</script>
