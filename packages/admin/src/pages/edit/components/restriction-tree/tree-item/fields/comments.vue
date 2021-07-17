<template>
  <q-input v-model="setter" dense borderless />
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'

import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { TreeBuilderNode } from '@/admin/src/pages/edit/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<TreeBuilderNode>,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const setter = computed({
      get() {
        return props.node.comment ?? ''
      },
      set(value: string) {
        if (value.length > 0) {
          treeManager.updateNodeProperty(props.node, 'comment', value)
        } else {
          treeManager.removeNodeProperty(props.node, 'comment')
        }
      },
    })
    return { setter }
  },
})
</script>
