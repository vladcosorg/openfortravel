<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      v-if="!loading"
      ref="treeElement"
      :nodes="tree"
      node-key="UID"
      label-key="type"
      default-expand-all
    >
      <template #default-header="scope">
        <tree-item
          :scope="scope"
          :tree="tree"
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

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@vue/composition-api'
import debounce from 'lodash/debounce'

import CustomInstruction from '@/admin/src/pages/edit/components/restriction-tree/fields/custom-instruction.vue'
import TreeItem from '@/admin/src/pages/edit/components/restriction-tree/tree-item.vue'
import {
  createIndexedTree,
  prepareForStorage,
} from '@/admin/src/pages/edit/composables/use-tree'
import { Destination } from '@/shared/src/api/destinations/models'
import {
  EncodedLogicNode,
  EncodedRestrictionNode,
} from '@/shared/src/restriction-tree/converter'

export type ScopedNodeData = { key: number }
export type QuasarTreeNode = QuasarLogicTreeNode | QuasarRestrictionTreeNode
export type QuasarLogicTreeNode = {
  UID: number
  children: QuasarTreeNode[]
} & EncodedLogicNode
export type QuasarRestrictionTreeNode = {
  UID: number
  showCustom: boolean
} & EncodedRestrictionNode
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
    let isInitialLoad = true
    const nodeToCopy = ref<QuasarTreeNode | undefined>()
    const tree = ref<QuasarTreeNode[]>(
      props.loading ? [] : createIndexedTree(props.destination, getNextUID),
    )

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
    }
  },
})
</script>
