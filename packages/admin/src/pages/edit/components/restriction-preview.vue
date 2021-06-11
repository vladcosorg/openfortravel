<template>
  <div class="q-gutter-y-lg q-ma-sm">
    <h5>Preview</h5>
    <q-list
      v-for="(group, key) in groups"
      :key="key"
      class="bg-blue-grey-10 rounded-borders q-pa-md"
    >
      <div v-for="(item, subkey) in group" :key="subkey">
        <restriction :restriction="item" />
        <q-item v-if="subkey < group.length - 1">
          <q-item-label>
            <q-chip square color="indigo-10" text-color="white"> AND </q-chip>
          </q-item-label></q-item
        >
      </div>
    </q-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import Restriction from '@/admin/src/pages/edit/components/preview/restriction.vue'
import { RestrictionGroupCollection } from '@/shared/src/restriction-tree/restriction-group'
import { PlainRestrictionGroups } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Restriction },
  props: {
    value: {
      type: Array as PropType<PlainRestrictionGroups>,
      required: true,
    },
  },
  setup(props) {
    const groups = computed(() =>
      new RestrictionGroupCollection(props.value)
        .getAvailableGroups()
        .map((groups) => [...groups.prerequisites, ...groups.actions]),
    )
    return { groups }
  },
})
</script>
