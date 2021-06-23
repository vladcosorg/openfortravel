<template>
  <q-item-section>
    <q-item-label class="text-primary bg-elevation-1 q-pa-md">
      <restriction-item-title :restriction="restriction">
        <template #default>
          <slot name="title" />
        </template>
      </restriction-item-title>
    </q-item-label>
    <q-item-label class="text-primary-subtle q-pt-xs text-body2">
      <restriction-item-content :restriction="restriction">
        <template #default>
          <slot name="subtitle" />
        </template>
      </restriction-item-content>
    </q-item-label>
    <q-item-label caption class="text-primary-subtle"
      ><slot name="reason" />
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import RestrictionItemContent from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item-content.vue'
import RestrictionItemTitle from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item-title.vue'
import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'

export default defineComponent({
  components: { RestrictionItemContent, RestrictionItemTitle },
  props: {
    restriction: {
      type: Object as PropType<RestrictionNode>,
      required: true,
    },
  },
})
</script>
