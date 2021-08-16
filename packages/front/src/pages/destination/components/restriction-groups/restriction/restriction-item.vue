<template>
  <q-item-section>
    <q-item-label>
      <restriction-item-title :restriction="restriction">
        <template #default>
          <slot name="title" />
        </template>
      </restriction-item-title>
    </q-item-label>

    <q-separator v-if="isExpanded" class="q-my-md" />
    <q-item-label v-if="isExpanded" class="text-primary-subtle text-body2">
      <restriction-item-content :restriction="restriction">
        <template #default>
          <slot name="subtitle" />
        </template>
      </restriction-item-content>
    </q-item-label>
    <q-item-label v-if="isExpanded" caption class="text-primary-subtle"
      ><slot name="reason" />
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref } from 'vue'

import RestrictionItemContent from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item-content.vue'
import RestrictionItemTitle from '@/front/src/pages/destination/components/restriction-groups/restriction/restriction-item-title.vue'
import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'

export default defineComponent({
  components: { RestrictionItemContent, RestrictionItemTitle },
  props: {
    restriction: {
      type: Object as PropType<AbstractRestrictionNode>,
      required: true,
    },
  },
  setup() {
    const isExpanded = inject('isExpanded') as Ref<boolean>
    return { isExpanded }
  },
})
</script>
