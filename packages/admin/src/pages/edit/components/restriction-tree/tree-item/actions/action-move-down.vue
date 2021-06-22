<template>
  <q-btn v-if="node.UID > 1" :icon="icon" unelevated @click="doAction">
    <q-tooltip>Move down</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { matArrowDownward as icon } from '@quasar/extras/material-icons'
import { defineComponent, inject, PropType } from '@vue/composition-api'

import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/symbols'
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
    const treeManager = inject(TreeManagerStoreKey)
    const doAction = () => treeManager.moveNodeDown(props.node)
    return {
      icon,
      doAction,
    }
  },
})
</script>
