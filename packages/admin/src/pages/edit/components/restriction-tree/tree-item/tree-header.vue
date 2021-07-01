<template>
  <div class="row q-gutter-sm" @click.stop @keypress.stop>
    <node-type-drowdown :node="node" />
    <q-btn-group unelevated style="background-color: #556066">
      <action-remove :node="node" />
    </q-btn-group>
    <action-add :node="node" unelevated style="background-color: #556066" />
    <action-add
      label="Or"
      :node="node"
      type="or"
      unelevated
      style="background-color: #556066"
    />
    <action-add
      label="And"
      :node="node"
      type="and"
      unelevated
      style="background-color: #556066"
    />

    <q-btn-group unelevated style="background-color: #556066">
      <action-duplicate :node="node" />
      <action-cut :node="node" />
      <action-copy :node="node" />
      <action-paste :node="node" />
    </q-btn-group>
    <q-btn-group unelevated style="background-color: #556066">
      <action-move-up :node="node" />
      <action-move-down :node="node" />
    </q-btn-group>
    <q-btn-group unelevated style="background-color: #556066">
      <action-add-title v-model="showCustomTitle" :node="node" />
      <action-add-content v-model="showCustomContent" :node="node" />
    </q-btn-group>
    <action-assign-group :node="node" />
    <comments :node="node" class="col" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import ActionAddContent from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-add-content.vue'
import ActionAddTitle from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-add-title.vue'
import ActionAdd from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-add.vue'
import ActionAssignGroup from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-assign-group.vue'
import ActionCopy from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-copy.vue'
import ActionCut from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-cut.vue'
import ActionDuplicate from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-duplicate.vue'
import ActionMoveDown from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-move-down.vue'
import ActionMoveUp from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-move-up.vue'
import ActionPaste from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-paste.vue'
import ActionRemove from '@/admin/src/pages/edit/components/restriction-tree/tree-item/actions/action-remove.vue'
import Comments from '@/admin/src/pages/edit/components/restriction-tree/tree-item/fields/comments.vue'
import NodeTypeDrowdown from '@/admin/src/pages/edit/components/restriction-tree/tree-item/fields/node-type-drowdown.vue'

export default defineComponent({
  components: {
    ActionAssignGroup,
    ActionMoveDown,
    ActionMoveUp,
    NodeTypeDrowdown,
    ActionAddContent,
    ActionAddTitle,
    ActionDuplicate,
    ActionAdd,
    ActionRemove,
    ActionCopy,
    ActionPaste,
    ActionCut,
    Comments,
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

    return {
      showCustomTitle,
      showCustomContent,
    }
  },
})
</script>
