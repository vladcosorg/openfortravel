import { Ref } from '@vue/composition-api'

import {
  QuasarLogicTreeNode,
  QuasarRestrictionTreeNode,
  QuasarTreeNode,
} from '@/admin/src/pages/edit/composables/use-tree'
import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

const linkMap = [
  ['allowedOrigins', 'countryCodes', 'allowedCitizenship'],
  ['languages'],
  ['hoursBeforeArrival'],
  ['hoursAfterArrival'],
]

export class LinkedNodeManager {
  protected linkedNodes: QuasarRestrictionTreeNode[] | undefined
  constructor(
    protected readonly tree: Ref<QuasarTreeNode[]>,
    protected readonly treeManager: TreeManager,
  ) {}

  registerLinkedNode(sourceNode: QuasarRestrictionTreeNode): void {
    if (!this.linkedNodes) {
      this.linkedNodes = this.findInitialLinkedNodes(this.tree.value)
    }

    if (!this.linkedNodes?.includes(sourceNode)) {
      this.linkedNodes?.push(sourceNode)
    }

    const existingNodeOfTheSameGroup = this.linkedNodes
      ?.filter(
        (node) =>
          node.group === sourceNode.group && sourceNode.UID !== node.UID,
      )
      .pop()

    if (existingNodeOfTheSameGroup) {
      this.maybeSyncLinkedNodes(existingNodeOfTheSameGroup)
    }
  }

  deregisterLinkedNode(sourceNode: QuasarRestrictionTreeNode): void {
    if (!this.linkedNodes) {
      this.linkedNodes = this.findInitialLinkedNodes(this.tree.value)
    }

    this.linkedNodes = this.linkedNodes?.filter(
      (node) => node.UID !== sourceNode.UID,
    )
  }

  maybeSyncLinkedNodes(sourceNode: QuasarRestrictionTreeNode): void {
    if (!sourceNode.group || !sourceNode.options) {
      return
    }

    if (!this.linkedNodes) {
      this.linkedNodes = this.findInitialLinkedNodes(this.tree.value)
    }
    if (this.linkedNodes.length === 0) {
      return
    }

    const matchingNodes = this.linkedNodes.filter(
      (linkedNode) =>
        linkedNode.UID !== sourceNode.UID &&
        linkedNode.group === sourceNode.group,
    )

    for (const optionGroup of linkMap) {
      for (const fromOption of optionGroup) {
        if (!(fromOption in sourceNode.options)) {
          continue
        }

        for (const option of optionGroup) {
          const matchedNodes = matchingNodes.filter(
            (matchingNode) =>
              matchingNode.options && option in matchingNode.options,
          )
          for (const matchingNode of matchedNodes) {
            this.treeManager.updateNodeOption(
              matchingNode,
              option as keyof typeof matchingNode.options,
              sourceNode.options[fromOption],
            )
          }
        }
      }
    }
  }

  protected findInitialLinkedNodes(
    subtree: QuasarTreeNode[],
  ): QuasarRestrictionTreeNode[] {
    const foundNodes: QuasarRestrictionTreeNode[] = []

    for (const node of subtree) {
      if (this.isRestrictionNode(node) && node.group) {
        foundNodes.push(node)
      }

      if ('children' in node) {
        foundNodes.push(...this.findInitialLinkedNodes(node.children))
      }
    }
    return foundNodes
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
}
