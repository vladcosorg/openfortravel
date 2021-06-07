<template>
  <div class="row q-gutter-sm" @click.stop @keypress.stop>
    <q-select
      :value="scope.node.type"
      class="text-capitalize"
      standout
      dense
      map-options
      emit-value
      :disable="scope.node.UID === 1"
      :options="options"
      @input="treeManager.updateNodeType($event, scope.node)"
    >
      <q-badge v-if="hasCustomInstructions" color="orange" floating>C</q-badge>
    </q-select>

    <q-btn-group unelevated style="background-color: #556066">
      <action-add :node="scope.node" />
      <action-add label="Or" :node="scope.node" type="and" />
      <action-add label="And" :node="scope.node" type="or" />
      <action-remove :node="scope.node" />
    </q-btn-group>
    <q-btn-group unelevated style="background-color: #556066">
      <action-duplicate :node="scope.node" />
      <action-cut :node="scope.node" />
      <action-copy :node="scope.node" />
      <action-paste :node="scope.node" />
    </q-btn-group>
    <action-customize :node="scope.node" />
    <comments :node="scope.node" class="col" />
    <node-body
      v-if="scope.node.type !== 'or' && scope.node.type !== 'and'"
      class="col-12"
      :node="scope.node"
      @input="treeManager.updateNodeOptions(scope.node, $event)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from '@vue/composition-api'

import ActionAdd from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-add.vue'
import ActionCopy from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-copy.vue'
import ActionCustomize from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-customize.vue'
import ActionCut from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-cut.vue'
import ActionDuplicate from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-duplicate.vue'
import ActionPaste from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-paste.vue'
import ActionRemove from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-remove.vue'
import Comments from '@/admin/src/pages/edit/components/restriction-tree/tree-item/comments.vue'
import NodeBody from '@/admin/src/pages/edit/components/restriction-tree/tree-item/option-wrapper.vue'
import { TreeManagerStoreKey } from '@/admin/src/pages/edit/modules/tree-manager'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
    ActionCustomize,
    ActionDuplicate,
    ActionAdd,
    ActionRemove,
    ActionCopy,
    ActionPaste,
    ActionCut,
    Comments,
    NodeBody,
  },
  model: {
    prop: 'scope',
  },
  props: {
    scope: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const treeManager = inject(TreeManagerStoreKey)
    const options = [
      { label: '-', value: '' },
      ...Object.values(LogicNodeType).map((value: string) => ({
        value,
        label: value.replaceAll('-', ' '),
      })),

      ...Object.values(RestrictionNodeType).map((value) => ({
        value,
        label: value.replaceAll('-', ' '),
      })),
    ]

    const hasCustomInstructions = computed(
      () =>
        props.scope.node?.options?.customInstructionTitle ||
        props.scope.node?.options?.customInstructionSubtitle,
    )

    return {
      hasCustomInstructions,
      options,
      treeManager,
    }
  },
})
</script>
