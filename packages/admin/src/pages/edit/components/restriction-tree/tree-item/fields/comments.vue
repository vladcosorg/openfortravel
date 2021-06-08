<template>
  <q-input v-model="setter" dense borderless />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import {
  TreeManager,
  TreeManagerStoreKey,
} from '@/admin/src/pages/edit/modules/tree-manager'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<QuasarTreeNode>,
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
