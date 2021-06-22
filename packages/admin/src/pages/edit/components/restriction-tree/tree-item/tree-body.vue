<template>
  <div>
    <options-wrapper
      v-if="node.type !== 'or' && node.type !== 'and'"
      :node="node"
      @input="updateOptions"
    />
    <custom-instruction
      :show-title="showCustomTitle"
      :show-content="showCustomContent"
      :node="node"
      @input="updateOptions"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref } from '@vue/composition-api'

import CustomInstruction from '@/admin/src/pages/edit/components/restriction-tree/tree-item/fields/custom-instruction.vue'
import OptionsWrapper from '@/admin/src/pages/edit/components/restriction-tree/tree-item/option-wrapper.vue'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { TreeBuilderRestrictionNode } from '@/admin/src/pages/edit/types'

export default defineComponent({
  components: {
    CustomInstruction,
    OptionsWrapper,
  },
  inheritAttrs: false,

  props: {
    node: {
      type: Object as PropType<TreeBuilderRestrictionNode>,
      required: true,
    },
  },
  setup(props) {
    const showCustomTitle = ref(false)
    const showCustomContent = ref(false)
    const treeManager = inject(TreeManagerStoreKey) as TreeManager
    const updateOptions = (options: TreeBuilderRestrictionNode['options']) => {
      treeManager.mergeNodeOptions(props.node, options)
    }
    return {
      showCustomTitle,
      showCustomContent,
      updateOptions,
    }
  },
})
</script>
