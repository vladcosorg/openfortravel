<template>
  <div>
    <q-item-label
      header
      class="text-h6 text-primary text-center"
      style="font-weight: normal"
    >
      {{ label }}
    </q-item-label>
    <div class="q-gutter-y-md">
      <group-restriction
        v-for="(restriction, key) in restrictions"
        :key="key"
        :index="key + 1"
        :restriction="restriction"
        :type="type"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GroupRestriction from '@/front/src/pages/destination/components/restriction-groups/group-restriction.vue'
import type { RestrictionCategory } from '@/shared/src/restriction-tree/abstract-restriction-node'
import type { PlainRestrictionGroup } from '@/shared/src/restriction-tree/types'

import type { PropType } from 'vue'

export default defineComponent({
  components: { GroupRestriction },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<RestrictionCategory>,
      required: true,
    },
    restrictions: {
      type: Array as PropType<PlainRestrictionGroup>,
    },
  },
})
</script>
