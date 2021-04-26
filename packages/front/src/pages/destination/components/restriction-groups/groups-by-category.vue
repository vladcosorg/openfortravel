<template>
  <div>
    <q-item-label v-if="restrictions" header class="text-h6 text-center text-primary">
      {{ label }}
    </q-item-label>
    <group-restriction
      v-for="(restriction, key) in restrictions"
      :key="key"
      :index="key + 1"
      :restriction="restriction"
      :type="type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import GroupRestriction from '@/front/src/pages/destination/components/restriction-groups/group-restriction.vue'
import { RestrictionCategory } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionGroup } from '@/shared/src/restriction-tree/types'

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
      type: Array as PropType<RestrictionGroup>,
    },
  },
})
</script>
