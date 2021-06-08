<template>
  <div>
    <node-body
      v-if="node.type !== 'or' && node.type !== 'and'"
      :node="node"
      @input="treeManager.updateNodeOptions(node, $event)"
    />
    <custom-instruction
      :show-title="showCustomTitle"
      :show-content="showCustomContent"
      :node="node"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@vue/composition-api'

import CustomInstruction from '@/admin/src/pages/edit/components/restriction-tree/tree-item/fields/custom-instruction.vue'
import NodeBody from '@/admin/src/pages/edit/components/restriction-tree/tree-item/option-wrapper.vue'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/tree-manager'

export default defineComponent({
  components: {
    CustomInstruction,
    NodeBody,
  },
  inheritAttrs: false,

  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showCustomTitle = ref(false)
    const showCustomContent = ref(false)
    const treeManager = inject(TreeManagerStoreKey)

    return {
      treeManager,
      showCustomTitle,
      showCustomContent,
    }
  },
})
</script>
