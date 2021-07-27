<template>
  <q-btn v-if="show" :icon="icon" :label="label" unelevated @click="doAction" />
</template>

<script lang="ts">
import { matAdd as icon } from '@quasar/extras/material-icons'
import { computed, defineComponent, inject, PropType } from 'vue'

import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
import { TreeBuilderNode } from '@/admin/src/pages/edit/types'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {},
  props: {
    node: {
      type: Object as PropType<TreeBuilderNode>,
      required: true,
    },
    type: {
      type: String as PropType<LogicNodeType | RestrictionNodeType>,
    },
    label: {
      type: String,
    },
  },
  setup(props) {
    const show = computed(() =>
      Object.values(LogicNodeType).includes(props.node.type),
    )
    const treeManager = inject(TreeManagerStoreKey)
    const doAction = () =>
      treeManager.addNewNodeToParent(props.node, props.type)
    return {
      icon,
      show,
      doAction,
    }
  },
})
</script>
