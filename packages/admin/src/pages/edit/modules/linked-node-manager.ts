import { Ref } from '@vue/composition-api'

import { TreeManager } from '@/admin/src/pages/edit/modules/tree-manager'
import {
  TreeBuilderLogicNode,
  TreeBuilderRestrictionNode,
  TreeBuilderNode,
} from '@/admin/src/pages/edit/types'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

const linkMap = [
  ['allowedOrigins', 'countryCodes', 'allowedCitizenship'],
  ['languages'],
  ['hoursBeforeArrival'],
  ['url'],
]

export class LinkedNodeManager {
  protected linkedNodes: TreeBuilderRestrictionNode[] | undefined
  constructor(
    protected readonly tree: Ref<TreeBuilderNode[]>,
    protected readonly treeManager: TreeManager,
  ) {}

  registerLinkedNode(sourceNode: TreeBuilderRestrictionNode): void {
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

  deregisterLinkedNode(sourceNode: TreeBuilderRestrictionNode): void {
    if (!this.linkedNodes) {
      this.linkedNodes = this.findInitialLinkedNodes(this.tree.value)
    }

    this.linkedNodes = this.linkedNodes?.filter(
      (node) => node.UID !== sourceNode.UID,
    )
  }

  maybeSyncLinkedNodes(sourceNode: TreeBuilderRestrictionNode): void {
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
    subtree: TreeBuilderNode[],
  ): TreeBuilderRestrictionNode[] {
    const foundNodes: TreeBuilderRestrictionNode[] = []

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

  protected isLogicNode(node: TreeBuilderNode): node is TreeBuilderLogicNode {
    return this.isLogicType(node.type)
  }

  protected isRestrictionNode(
    node: TreeBuilderNode,
  ): node is TreeBuilderRestrictionNode {
    return !this.isLogicType(node.type)
  }

  protected isLogicType(
    type: LogicNodeType | RestrictionNodeType,
  ): type is LogicNodeType {
    return Object.values(LogicNodeType).includes(type as LogicNodeType)
  }
}
