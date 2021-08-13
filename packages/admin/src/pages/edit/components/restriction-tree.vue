<template>
  <div class="row">
    <q-tree
      v-if="!loading"
      ref="treeDOMElement"
      :class="`${$style.tree} col q-pa-md q-gutter-sm`"
      :nodes="tree"
      node-key="UID"
      label-key="type"
      default-expand-all
      :duration="0"
    >
      <template #default-header="scope">
        <tree-header class="col-12" :node="scope.node" />
      </template>
      <template #default-body="scope">
        <tree-body class="col-12" :node="scope.node" />
      </template>
    </q-tree>
    <restriction-preview
      v-if="showPreview"
      class="col-4"
      :value="destination"
    />
  </div>
</template>

<style lang="sass" module>
.tree
  \:global
    .q-tree__node
      padding-bottom: 10px
    .q-tree__node--child
      .q-tree__node-header
        border-bottom: 1px solid rgb(0, 0, 0, 20%)
      .q-tree__node-body, .q-tree__node-header
        background-color: rgb(0, 0, 0, 20%)
        padding: 10px
</style>

<script lang="ts">
import debounce from 'lodash/debounce'
import Vue, { defineComponent, provide, ref, watch } from 'vue'

import RestrictionPreview from '@/admin/src/pages/edit/components/restriction-preview.vue'
import TreeBody from '@/admin/src/pages/edit/components/restriction-tree/tree-item/tree-body.vue'
import TreeHeader from '@/admin/src/pages/edit/components/restriction-tree/tree-item/tree-header.vue'
import {
  EventBus,
  TreeManagerStoreKey,
} from '@/admin/src/pages/edit/modules/symbols'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import { TreeBuilderNode } from '@/admin/src/pages/edit/types'
import type { Destination } from '@/shared/src/api/destinations/models'
import { isRestrictionNodeType } from '@/shared/src/restriction-tree/guards'
import { Prerequisites } from '@/shared/src/restriction-tree/types'

import type { PropType } from 'vue'

export default defineComponent({
  components: { RestrictionPreview, TreeBody, TreeHeader },
  model: {
    prop: 'destination',
  },
  props: {
    destination: {
      type: Object as PropType<Destination>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    showPreview: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const treeDOMElement = ref()
    const nodeBuffer = ref<TreeBuilderNode | undefined>()
    let isInitialLoad = true

    const tree = ref<TreeBuilderNode[]>([])
    const treeManager = new TreeManager(tree, nodeBuffer)

    provide(TreeManagerStoreKey, treeManager)
    provide(EventBus, new Vue())

    watch(
      () => props.loading,
      (isLoading) => {
        if (isLoading) {
          return
        }

        treeManager.initializeWith(props.destination.normalizedRestrictionTree)
        setTimeout(() => treeDOMElement.value.expandAll(), 500)
      },
      { immediate: true },
    )

    const emitChangedTree = debounce(() =>
      emit('input', {
        restrictionTree: treeManager.exportToStorageFormat(),
      }),
    )

    watch(
      tree,
      () => {
        if (props.loading) {
          return
        }

        if (isInitialLoad) {
          isInitialLoad = false
          return
        }

        emitChangedTree()
        treeDOMElement.value.expandAll()
      },
      { deep: true },
    )

    const getConjuction = (type) => {
      if (!isRestrictionNodeType(type)) {
        return
      }

      if (Prerequisites.includes(type)) {
        return 'If'
      }

      return 'Then'
    }

    return {
      getConjuction,
      tree,
      treeDOMElement,
    }
  },
})
</script>
