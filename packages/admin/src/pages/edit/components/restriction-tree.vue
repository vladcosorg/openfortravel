<template>
  <div class="row">
    <q-tree
      v-if="!loading"
      ref="treeDOMElement"
      class="col q-pa-md q-gutter-sm"
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
    <restriction-preview class="col-4" :value="destination" />
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { defineComponent, provide, ref, watch } from '@vue/composition-api'
import debounce from 'lodash/debounce'
import Vue from 'vue'

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

    return {
      tree,
      treeDOMElement,
    }
  },
})
</script>
