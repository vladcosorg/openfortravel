<template>
  <generic v-model="internalOptions" :type="node.type" />
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, inject } from '@vue/composition-api'

import Generic from '@/admin/src/pages/edit/components/restriction-tree/tree-item/generic.vue'
import type { QuasarRestrictionTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'

export default defineComponent({
  components: {
    Generic,
  },
  model: {
    prop: 'node',
  },
  props: {
    node: {
      type: Object as PropType<QuasarRestrictionTreeNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey)
    const internalOptions = computed({
      get() {
        return props.node.options ?? {}
      },
      set(value) {
        treeManager.updateNodeOptions(props.node, value)
      },
    })
    return { internalOptions }
  },
})
</script>
