<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      v-if="!loading"
      ref="treeElement"
      :nodes="tree"
      node-key="UID"
      label-key="type"
      default-expand-all
      :duration="0"
    >
      <template #default-header="scope">
        <tree-item
          class="col-12"
          :scope="scope"
          :tree="tree"
          :node-buffer="nodeBuffer"
          :buffered-node="nodeToCopy"
          :next-uid="getNextUID"
          @copy="nodeToCopy = $event"
        />
      </template>
      <template #default-body="scope">
        <custom-instruction :scope="scope" />
      </template>
    </q-tree>
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api'
import { defineComponent, ref, watch, provide } from '@vue/composition-api'
import debounce from 'lodash/debounce'

import CustomInstruction from '@/admin/src/pages/edit/components/restriction-tree/tree-item/custom-instruction.vue'
import TreeItem from '@/admin/src/pages/edit/components/restriction-tree/tree-item/tree-item.vue'
import type { QuasarTreeNode } from '@/admin/src/pages/edit/composables/use-tree'
import {
  createIndexedTree,
  prepareForStorage,
} from '@/admin/src/pages/edit/composables/use-tree'
import {
  TreeManager,
  TreeManagerStoreKey,
} from '@/admin/src/pages/edit/modules/tree-manager'
import type { Destination } from '@/shared/src/api/destinations/models'

export default defineComponent({
  components: { CustomInstruction, TreeItem },
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
    let currentUID = 0
    const getNextUID = (): number => {
      currentUID++
      return currentUID
    }

    const treeElement = ref()
    const nodeBuffer = ref<QuasarTreeNode | undefined>()
    let isInitialLoad = true
    const nodeToCopy =
      ref<{ action: 'cut' | 'copy'; node: QuasarTreeNode } | undefined>()
    const tree = ref<QuasarTreeNode[]>(
      props.loading ? [] : createIndexedTree(props.destination, getNextUID),
    )

    provide(TreeManagerStoreKey, new TreeManager(tree, nodeBuffer, getNextUID))

    watch(
      () => props.loading,
      (newValue) => {
        if (newValue) {
          return
        }

        tree.value = createIndexedTree(props.destination, getNextUID)
        setTimeout(() => treeElement.value.expandAll(), 500)
      },
    )

    const debouncedEmitter = debounce((changedTree) =>
      emit('input', {
        restrictionTree: prepareForStorage(changedTree),
      }),
    )

    watch(
      tree,
      (changedTree) => {
        if (props.loading) {
          return
        }

        if (isInitialLoad) {
          isInitialLoad = false
          return
        }

        debouncedEmitter(changedTree)
        treeElement.value.expandAll()
      },
      { deep: true },
    )

    return {
      tree,
      treeElement,
      nodeToCopy,
      getNextUID,
      nodeBuffer,
    }
  },
})
</script>
