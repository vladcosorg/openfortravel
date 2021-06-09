import { Ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

import {
  indexTheTree,
  QuasarLogicTreeNode,
  QuasarRestrictionTreeNode,
  QuasarTreeNode,
} from '@/admin/src/pages/edit/composables/use-tree'
import { LinkedNodeManager } from '@/admin/src/pages/edit/modules/linked-node-manager'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

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

export class TreeManager {
  public readonly linkedNodeManager: LinkedNodeManager
  constructor(
    protected readonly tree: Ref<QuasarTreeNode[]>,
    protected readonly buffer: Ref<QuasarTreeNode | undefined>,
    protected readonly generateUID: () => number,
  ) {
    this.linkedNodeManager = new LinkedNodeManager(this.tree, this)
  }

  addNodeToParent(
    parentNode: QuasarLogicTreeNode,
    type: RestrictionNodeType = RestrictionNodeType.ORIGIN,
  ): void {
    const newNode = this.createEmptyNodeOfType(type)
    parentNode.children.push(newNode)
  }

  updateNodeOptions(node: QuasarRestrictionTreeNode, options: unknown): void {
    Object.assign(node, { options })
    this.linkedNodeManager.maybeSyncLinkedNodes(node)
  }

  updateNodeOption<
    T extends QuasarRestrictionTreeNode,
    K extends keyof T['options'],
    V extends T[K],
  >(node: T, key: K, value: V): void {
    if (!node.options) {
      node.options = {}
    }

    Vue.set(node.options, key as string, value)
  }

  updateNodeProperty<T extends QuasarTreeNode, K extends keyof T>(
    node: T,
    key: K,
    value: T[K],
  ): void {
    Vue.set(node, key as string, value)
  }

  updateNodeGroup(
    node: QuasarRestrictionTreeNode,
    value: string | undefined,
  ): void {
    if (!value) {
      this.removeNodeProperty(node, 'group')
      this.linkedNodeManager.deregisterLinkedNode(node)
      return
    }

    this.updateNodeProperty(node, 'group', value)
    this.linkedNodeManager.registerLinkedNode(node)
  }

  removeNodeProperty<T extends QuasarTreeNode, K extends keyof T>(
    node: T,
    key: K,
  ): void {
    Vue.delete(node, key as string)
  }

  updateNodeType(
    newType: LogicNodeType | RestrictionNodeType,
    node: QuasarTreeNode,
  ): void {
    if (this.isLogicType(newType) && !(node as QuasarLogicTreeNode).children) {
      node = Object.assign({}, node, { children: [] })
    } else if (
      !this.isLogicType(newType) &&
      (node as QuasarLogicTreeNode).children
    ) {
      node = Object.assign({}, node, {
        children: undefined,
      })
    }

    if (this.isRestrictionNode(node) && node.options) {
      const migratedOptions: Record<keyof typeof compatMap, unknown> = {}
      for (const [optionID, optionValue] of Object.entries(node.options)) {
        const key = [node.type, newType, optionID].join('')
        if (compatMap.has(key)) {
          migratedOptions[compatMap.get(key)] = optionValue
        }
      }

      this.updateNodeOptions(node, migratedOptions)
    }

    node.type = newType
  }

  moveNodeUp(node: QuasarTreeNode): void {
    const parentNode = this.findNodeParentByUID(node.UID)
    const currentIndex = parentNode.children.indexOf(node)

    if (currentIndex === 0) {
      return
    }

    parentNode.children = this.moveChildIndex(
      parentNode.children,
      currentIndex,
      currentIndex - 1,
    )
  }

  moveNodeDown(node: QuasarTreeNode): void {
    const parentNode = this.findNodeParentByUID(node.UID)
    const currentIndex = parentNode.children.indexOf(node)

    parentNode.children = this.moveChildIndex(
      parentNode.children,
      currentIndex,
      currentIndex + 1,
    )
  }

  hasBuffer(): boolean {
    return !!this.buffer.value
  }

  cutNodeToBuffer(node: QuasarTreeNode): void {
    this.buffer.value = node
    this.removeNode(node)
  }

  copyNodeToBuffer(node: QuasarTreeNode): void {
    this.buffer.value = node
  }

  duplicateNode(node: QuasarTreeNode): void {
    const parentNode = this.findNodeParentByUID(node.UID)
    this.copyNodeToBuffer(node)
    if (parentNode) {
      this.pasteNodeFromBuffer(parentNode)
    }
  }

  pasteNodeFromBuffer(parentNode: QuasarLogicTreeNode): void {
    if (!this.buffer.value) {
      return
    }

    const targetNode = cloneDeep(
      indexTheTree([this.buffer.value], this.generateUID),
    ).pop()

    if (targetNode) {
      parentNode.children.push(targetNode)
    }

    this.buffer.value = undefined
  }

  removeNode(node: QuasarTreeNode): void {
    const parent = this.findNodeParentByUID(node.UID)
    parent.children = parent.children.filter((item) => item.UID !== node.UID)
  }

  protected moveChildIndex<T extends QuasarTreeNode[]>(
    array: T,
    oldIndex: number,
    newIndex: number,
  ): T {
    if (newIndex >= array.length) {
      newIndex = array.length - 1
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
    return array
  }

  protected createEmptyNodeOfType(
    type: LogicNodeType | RestrictionNodeType,
  ): QuasarTreeNode {
    if (this.isLogicType(type)) {
      return {
        type,
        UID: this.generateUID(),
        children: [],
      }
    }

    return {
      type,
      UID: this.generateUID(),
      options: {},
    }
  }

  protected isLogicNode(node: QuasarTreeNode): node is QuasarLogicTreeNode {
    return this.isLogicType(node.type)
  }

  protected isRestrictionNode(
    node: QuasarTreeNode,
  ): node is QuasarRestrictionTreeNode {
    return !this.isLogicType(node.type)
  }

  protected isLogicType(
    type: LogicNodeType | RestrictionNodeType,
  ): type is LogicNodeType {
    return Object.values(LogicNodeType).includes(type as LogicNodeType)
  }

  protected findNodeParentByUID(UID: number): QuasarLogicTreeNode {
    const node = this.findRecursive(UID, this.tree.value)

    if (!node) {
      throw new Error(`Could not find the parent of node with UID ${UID}`)
    }

    return node as QuasarLogicTreeNode
  }

  protected findRecursive(
    UID: number,
    subtree: QuasarTreeNode[],
  ): QuasarTreeNode | void {
    for (const node of subtree) {
      if (node.UID === UID) {
        return node as QuasarLogicTreeNode
      }

      if ('children' in node) {
        const found = this.findRecursive(UID, node.children as QuasarTreeNode[])
        if (found) {
          return found.UID === UID ? node : found
        }
      }
    }
  }
}
