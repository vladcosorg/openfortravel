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
      @input="updateNodeType($event, scope)"
    >
      <q-badge v-if="hasCustomInstructions" color="orange" floating>C</q-badge>
    </q-select>

    <q-btn-group unelevated style="background-color: #556066">
      <q-btn
        v-if="scope.node.type === 'or' || scope.node.type === 'and'"
        :icon="addIcon"
        unelevated
        @click="addNode(scope)"
      />
      <q-btn
        v-if="scope.node.type === 'or' || scope.node.type === 'and'"
        unelevated
        label="Or"
        @click="addNode(scope, 'or')"
      />
      <q-btn
        v-if="scope.node.type === 'or' || scope.node.type === 'and'"
        unelevated
        label="And"
        @click="addNode(scope, 'and')"
      />
      <q-btn
        v-if="scope.node.UID > 1"
        :icon="deleteIcon"
        unelevated
        @click="removeNode(scope)"
      />
    </q-btn-group>
    <q-btn-group unelevated style="background-color: #556066">
      <q-btn
        v-if="scope.node.UID > 1"
        :icon="duplicateIcon"
        unelevated
        @click="duplicateNode(scope)"
      />
      <q-btn
        v-if="scope.node.UID > 1"
        :icon="copyIcon"
        unelevated
        @click="copyNode(scope)"
      />
      <q-btn
        v-if="scope.node.UID > 1"
        :icon="cutIcon"
        unelevated
        @click="cutNode(scope)"
      />
      <q-btn
        v-if="
          (scope.node.type === 'or' || scope.node.type === 'and') &&
          bufferedNode
        "
        :icon="pasteIcon"
        unelevated
        @click="pasteNode(scope)"
      />
    </q-btn-group>
    <q-btn
      v-if="scope.node.type !== 'or' && scope.node.type !== 'and'"
      style="background-color: #556066"
      :icon="showIcon"
      unelevated
      @click="showCustomInstructions(scope)"
    />
    <comments
      :scope="scope"
      class="col"
      @input="updateOptions(scope, $event)"
    />
    <node-body
      v-if="scope.node.type !== 'or' && scope.node.type !== 'and'"
      class="col-12"
      :node="scope.node"
      @input="updateOptions(scope, $event)"
    />
  </div>
</template>

<script lang="ts">
import {
  matAdd as addIcon,
  matContentCut as cutIcon,
  matContentPaste as pasteIcon,
  matFileCopy as copyIcon,
  matRemove as deleteIcon,
  matScanner as duplicateIcon,
  matToggleOn as showIcon,
} from '@quasar/extras/material-icons'
import type { PropType } from '@vue/composition-api'
import { computed, defineComponent, toRef } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import Comments from '@/admin/src/pages/edit/components/restriction-tree/tree-item/comments.vue'
import NodeBody from '@/admin/src/pages/edit/components/restriction-tree/tree-item/option-wrapper.vue'
import type {
  QuasarLogicTreeNode,
  QuasarTreeNode,
  ScopedNodeData,
} from '@/admin/src/pages/edit/composables/use-tree'
import { indexTheTree } from '@/admin/src/pages/edit/composables/use-tree'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: { Comments, NodeBody },
  model: {
    prop: 'scope',
  },
  props: {
    bufferedNode: {
      type: Object as PropType<{
        action: 'cut' | 'copy'
        node: QuasarTreeNode
      }>,
      required: false,
    },
    scope: {
      type: Object,
      required: true,
    },
    tree: {
      type: Array as PropType<QuasarTreeNode[]>,
      required: true,
    },
    nextUid: {
      type: Function as PropType<() => number>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const tree = toRef(props, 'tree')
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

    const addNode = (
      node: ScopedNodeData,
      type: RestrictionNodeType = RestrictionNodeType.ORIGIN,
    ) => {
      const parent = findNode(tree.value, node.key) as QuasarLogicTreeNode
      parent.children.push(
        type === LogicNodeType.AND || type === LogicNodeType.OR
          ? {
              type,
              UID: props.nextUid(),
              children: [],
            }
          : {
              type,
              UID: props.nextUid(),
              options: {},
            },
      )
    }

    const removeNode = (node: ScopedNodeData) => {
      const parent = findNodeParent(tree.value, node.key) as QuasarLogicTreeNode
      parent.children = parent.children.filter((item) => item.UID !== node.key)
    }
    const duplicateNode = (node: ScopedNodeData) => {
      const parent = findNodeParent(tree.value, node.key) as QuasarLogicTreeNode
      const currentNode = findNode(tree.value, node.key)
      parent.children.push(
        cloneDeep(indexTheTree([currentNode], props.nextUid).pop()),
      )
    }

    const copyNode = (node: ScopedNodeData) => {
      emit('copy', { action: 'copy', node: findNode(tree.value, node.key) })
    }

    const cutNode = (node: ScopedNodeData) => {
      emit('copy', { action: 'cut', node: findNode(tree.value, node.key) })
    }

    const pasteNode = (node: ScopedNodeData) => {
      const parent = findNode(tree.value, node.key) as QuasarLogicTreeNode

      if (props.bufferedNode.action === 'copy') {
        parent.children.push(
          cloneDeep(
            indexTheTree([props.bufferedNode.node], props.nextUid).pop(),
          ),
        )
      } else {
        const oldParent = findNodeParent(
          tree.value,
          props.bufferedNode.node.UID,
        )
        oldParent.children = oldParent.children.filter(
          (item) => item.UID !== props.bufferedNode.node.UID,
        )
        parent.children.push(props.bufferedNode.node)
      }

      emit('copy')
    }

    const updateNodeType = (
      type: RestrictionNodeType,
      scope: ScopedNodeData,
    ) => {
      let currentNode = findNode(tree.value, scope.key)

      if (!currentNode) {
        throw new Error(`Could not update node ${scope.key}`)
      }

      const migratedOptions = {}

      for (const [optionID, optionValue] of Object.entries(
        currentNode.options,
      )) {
        const key = [currentNode.type, type, optionID].join('')
        if (compatMap.has(key)) {
          migratedOptions[compatMap.get(key)] = optionValue
        }
      }

      if (
        Object.values(LogicNodeType).includes(type) &&
        !(currentNode as QuasarLogicTreeNode).children
      ) {
        currentNode = Object.assign({}, currentNode, { children: [] })
      } else if (
        Object.values(RestrictionNodeType).includes(type) &&
        (currentNode as QuasarLogicTreeNode).children
      ) {
        currentNode = Object.assign({}, currentNode, {
          children: undefined,
        })
      }

      replaceNode(
        tree.value,
        Object.assign(currentNode, { type, options: migratedOptions }),
      )
    }

    const updateOptions = (scope: ScopedNodeData, data: unknown) => {
      Object.assign(scope.node, { options: data.options })
    }

    const showCustomInstructions = (scope: ScopedNodeData) => {
      scope.node.showCustom = !scope.node.showCustom
    }

    return {
      addIcon,
      deleteIcon,
      duplicateIcon,
      copyIcon,
      cutIcon,
      pasteIcon,
      showIcon,
      cutNode,
      addNode,
      removeNode,
      duplicateNode,
      updateNodeType,
      copyNode,
      pasteNode,
      updateOptions,
      showCustomInstructions,
      hasCustomInstructions,
      options,
    }
  },
})

function findNodeParent(
  tree: QuasarTreeNode[],
  nodeUID: number,
): QuasarTreeNode | undefined {
  for (const node of tree) {
    if (node.UID === nodeUID) {
      return node
    }

    if ('children' in node) {
      const found = findNodeParent(node.children as QuasarTreeNode[], nodeUID)
      if (found) {
        return found.UID === nodeUID ? node : found
      }
    }
  }

  return
}

function findNode(
  tree: QuasarTreeNode[],
  nodeUID: number,
): QuasarTreeNode | undefined {
  for (const node of tree) {
    if (node.UID === nodeUID) {
      return node
    }

    if ('children' in node) {
      const found = findNode(node.children as QuasarTreeNode[], nodeUID)
      if (found) {
        return found
      }
    }
  }

  return
}

function replaceNode(tree: QuasarTreeNode[], newNode: QuasarTreeNode): boolean {
  for (const [index, node] of tree.entries()) {
    if (node.UID === newNode.UID) {
      tree.splice(index, 1, newNode)
      return true
    }

    if ('children' in node) {
      const found = replaceNode(node.children as QuasarTreeNode[], newNode)
      if (found) {
        return true
      }
    }
  }

  return false
}

const compatMap = new Map()

const compatibleOptions = [
  {
    [RestrictionNodeType.CITIZENSHIP]: 'allowedCitizenship',
    [RestrictionNodeType.ORIGIN]: 'allowedOrigins',
    [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: 'countryCodes',
  },
]
for (const optionSet of compatibleOptions) {
  for (const [firstType, firstField] of Object.entries(optionSet)) {
    for (const [secondType, secondField] of Object.entries(optionSet)) {
      if (firstType === secondType) {
        continue
      }
      compatMap.set([firstType, secondType, firstField].join(''), secondField)
    }
  }
}
</script>
