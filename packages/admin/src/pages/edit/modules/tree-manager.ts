import { InjectionKey, Ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import {
  indexTheTree,
  QuasarLogicTreeNode,
  QuasarRestrictionTreeNode,
  QuasarTreeNode,
} from '@/admin/src/pages/edit/composables/use-tree'
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
  constructor(
    protected readonly tree: Ref<QuasarTreeNode[]>,
    protected readonly buffer: Ref<QuasarTreeNode | undefined>,
    protected readonly generateUID: () => number,
  ) {}

  addNodeToParent(
    parentNode: QuasarLogicTreeNode,
    type: RestrictionNodeType = RestrictionNodeType.ORIGIN,
  ): void {
    const newNode = this.createEmptyNodeOfType(type)
    parentNode.children.push(newNode)
  }

  updateNodeOptions(node: QuasarTreeNode, options: unknown): void {
    Object.assign(node, { options })
  }

  updateNodeProperty<T extends QuasarTreeNode, K extends keyof T>(
    node: T,
    key: K,
    value: T[K],
  ): void {
    Object.assign(node, { [key]: value })
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

    node.type = newType

    if (this.isRestrictionNode(node)) {
      const migratedOptions: Record<keyof typeof compatMap, unknown> = {}
      for (const [optionID, optionValue] of Object.entries(node.options)) {
        const key = [node.type, newType, optionID].join('')
        if (compatMap.has(key)) {
          migratedOptions[compatMap.get(key)] = optionValue
        }
      }

      this.updateNodeOptions(node, migratedOptions)
    }
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

  toggleCustom(node: QuasarRestrictionTreeNode): void {
    node.showCustom = !node.showCustom
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
      showCustom: false,
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

  protected removeNode(node: QuasarTreeNode): void {
    const parent = this.findNodeParentByUID(node.UID)
    parent.children = parent.children.filter((item) => item.UID !== node.UID)
  }

  protected findNodeParentByUID(
    UID: number,
    treeOrSubtree?: QuasarTreeNode[],
  ): QuasarLogicTreeNode {
    for (const node of treeOrSubtree ?? this.tree.value) {
      if (node.UID === UID) {
        return node as QuasarLogicTreeNode
      }

      if ('children' in node) {
        const found = this.findNodeParentByUID(
          UID,
          node.children as QuasarTreeNode[],
        )
        if (found) {
          return found.UID === UID ? node : found
        }
      }
    }

    throw new Error(`Could not find the parent of node with UID ${UID}`)
  }
}
export const TreeManagerStoreKey: InjectionKey<TreeManager> =
  Symbol('TreeManager')
