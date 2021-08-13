import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'
import Vue, { Ref } from 'vue'

import { LinkedNodeManager } from '@/admin/src/pages/edit/modules/linked-node-manager'
import {
  TreeBuilderLogicNode,
  TreeBuilderRestrictionNode,
  TreeBuilderNode,
} from '@/admin/src/pages/edit/types'
import { EncodedTreeNode } from '@/shared/src/restriction-tree/converter'
import {
  isLogicNode,
  isLogicNodeType,
  isRestrictionNode,
} from '@/shared/src/restriction-tree/guards'
import { createDefaultNodeOfType } from '@/shared/src/restriction-tree/node-normalizers'
import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

const compatMap = new Map<
  string,
  keyof typeof RestrictionNode['defaultOptions']
>()

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
  private lastNodeUID = 1

  constructor(
    protected readonly tree: Ref<TreeBuilderNode[]>,
    protected readonly buffer: Ref<TreeBuilderNode | undefined>,
  ) {
    this.tree.value.push(this.createEmptyNodeOfType(LogicNodeType.OR))
    this.linkedNodeManager = new LinkedNodeManager(this.tree, this)
  }

  initializeWith(rootChildren: EncodedTreeNode[]): void {
    const rootNode = this.getRootNode()
    for (const rootChild of rootChildren) {
      this.addExistingNodeToParent(rootChild, rootNode)
    }
  }

  addNewNodeToParent(
    parentNode: TreeBuilderLogicNode,
    type: RestrictionNodeType = RestrictionNodeType.ORIGIN,
  ): void {
    const newNode = this.createEmptyNodeOfType(type)
    parentNode.children.push(newNode)
  }

  replaceNodeOptions(node: TreeBuilderRestrictionNode, options: unknown): void {
    Object.assign(node, { options })
    this.linkedNodeManager.maybeSyncLinkedNodes(node)
  }

  mergeNodeOptions<T extends TreeBuilderRestrictionNode>(
    node: T,
    options: Partial<T['options']>,
  ): void {
    node.options = Object.assign({}, node.options, options)
    this.linkedNodeManager.maybeSyncLinkedNodes(node)
  }

  updateNodeOption<
    T extends TreeBuilderRestrictionNode,
    K extends keyof T['options'],
    V extends T['options'][K],
  >(node: T, key: K, value: V): void {
    Vue.set(node.options, key as string, value)
  }

  updateNodeProperty<T extends TreeBuilderNode, K extends keyof T>(
    node: T,
    key: K,
    value: T[K],
  ): void {
    Vue.set(node, key as string, value)
  }

  updateNodeGroup(
    node: TreeBuilderRestrictionNode,
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

  removeNodeProperty<T extends TreeBuilderNode, K extends keyof T>(
    node: T,
    key: K,
  ): void {
    Vue.delete(node, key as string)
  }

  updateNodeType(
    newType: LogicNodeType | RestrictionNodeType,
    node: TreeBuilderNode,
  ): void {
    isLogicNodeType(newType)
      ? this.updateNodeToLogicType(newType, node)
      : this.updateNodeToRestrictionType(newType, node)
  }

  moveNodeUp(node: TreeBuilderNode): void {
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

  moveNodeDown(node: TreeBuilderNode): void {
    const parentNode = this.findNodeParentByUID(node.UID)
    const currentIndex = parentNode.children.indexOf(node)

    parentNode.children = this.moveChildIndex(
      parentNode.children,
      currentIndex,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      currentIndex + 1,
    )
  }

  hasBuffer(): boolean {
    return !!this.buffer.value
  }

  cutNodeToBuffer(node: TreeBuilderNode): void {
    this.buffer.value = node
    this.removeNode(node)
  }

  copyNodeToBuffer(node: TreeBuilderNode): void {
    this.buffer.value = node
  }

  duplicateNode(node: TreeBuilderNode): void {
    const parentNode = this.findNodeParentByUID(node.UID)
    this.copyNodeToBuffer(node)
    if (parentNode) {
      this.pasteNodeFromBuffer(parentNode)
    }
  }

  pasteNodeFromBuffer(parentNode: TreeBuilderLogicNode): void {
    if (!this.buffer.value) {
      return
    }

    this.addExistingNodeToParent(this.buffer.value, parentNode)
    this.buffer.value = undefined
  }

  removeNode(node: TreeBuilderNode): void {
    const parent = this.findNodeParentByUID(node.UID)
    parent.children = parent.children.filter((item) => item.UID !== node.UID)
  }

  replaceNode(oldNode: TreeBuilderNode, newNode: TreeBuilderNode): void {
    const parentNode = this.findNodeParentByUID(oldNode.UID)
    parentNode.children.splice(parentNode.children.indexOf(oldNode), 1, newNode)
  }

  exportToStorageFormat(): EncodedTreeNode[] {
    const rootNode = cloneDeep(this.getRootNode())
    if (!rootNode || !rootNode.children) {
      return []
    }

    return this.cleanObjectRecursive(rootNode.children)
  }

  protected cleanObjectRecursive(
    indexedTree: TreeBuilderNode[],
  ): EncodedTreeNode[] {
    const out: EncodedTreeNode[] = []

    for (const dirtyNode of indexedTree) {
      const node = omit(dirtyNode, ['UID']) as EncodedTreeNode

      if (isLogicNode(node)) {
        if (node.children.length === 0) {
          continue
        }

        node.children = this.cleanObjectRecursive(
          node.children as TreeBuilderNode[],
        )
      }

      out.push(node)
    }
    return out
  }

  protected moveChildIndex<T extends TreeBuilderNode[]>(
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

  protected updateNodeToLogicType(
    newType: LogicNodeType,
    node: TreeBuilderNode,
  ): void {
    if (isLogicNode(node)) {
      this.updateNodeProperty(node, 'type', newType)
    } else {
      this.replaceNode(node, this.createEmptyNodeOfType(newType))
    }
  }

  protected updateNodeToRestrictionType(
    newType: RestrictionNodeType,
    oldNode: TreeBuilderNode,
  ): void {
    const newNode = this.createEmptyNodeOfType(
      newType,
    ) as TreeBuilderRestrictionNode
    this.replaceNode(oldNode, newNode)

    if (isRestrictionNode(oldNode)) {
      this.mergeNodeOptions(newNode, this.getMigratedOptions(oldNode, newNode))
    }
  }

  protected getMigratedOptions<T extends TreeBuilderRestrictionNode>(
    oldNode: TreeBuilderRestrictionNode,
    newNode: T,
  ): Partial<T['options']> {
    const migratedOptions: Partial<T['options']> = {}
    for (const [optionID, optionValue] of Object.entries(oldNode.options)) {
      const key = [oldNode.type, newNode.type, optionID].join('')
      if (compatMap.has(key)) {
        const index = compatMap.get(key) as keyof T['options']
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        migratedOptions[index] = optionValue as unknown as any
      }
    }

    return migratedOptions
  }

  protected createEmptyNodeOfType(
    type: LogicNodeType | RestrictionNodeType,
  ): TreeBuilderNode {
    return this.injectUID(createDefaultNodeOfType(type))
  }

  protected injectUID(node: EncodedTreeNode): TreeBuilderNode {
    return Object.assign({}, node, {
      UID: this.lastNodeUID++,
    }) as TreeBuilderNode
  }

  protected findNodeParentByUID(UID: number): TreeBuilderLogicNode {
    const node = this.findRecursive(UID, this.tree.value)

    if (!node || !isLogicNode(node)) {
      throw new Error(`Could not find the parent of node with UID ${UID}`)
    }

    return node
  }

  protected findRecursive(
    UID: number,
    subtree: TreeBuilderNode[],
  ): TreeBuilderNode | void {
    for (const node of subtree) {
      if (node.UID === UID) {
        return node
      }

      if ('children' in node) {
        const found = this.findRecursive(UID, node.children)
        if (found) {
          return found.UID === UID ? node : found
        }
      }
    }
  }

  protected addExistingNodeToParent(
    existingNode: EncodedTreeNode,
    parentNode: TreeBuilderLogicNode,
  ): void {
    const normalizedNode = this.injectUID(existingNode)

    if (isLogicNode(normalizedNode) && normalizedNode.children.length > 0) {
      const rawChildren = normalizedNode.children
      normalizedNode.children = []
      rawChildren.map((existingChildNode) =>
        this.addExistingNodeToParent(existingChildNode, normalizedNode),
      )
    }

    parentNode.children.push(normalizedNode)
  }

  protected getRootNode(): TreeBuilderLogicNode {
    const rootNode = this.tree.value[0]

    if (!isLogicNode(rootNode)) {
      throw new Error('Unexpected root node type')
    }

    return rootNode
  }
}
