import type { EncodedLogicNode } from '@/shared/src/restriction-tree/converter'
import type {
  LogicNodeType,
  PlainRestrictionGroups,
  TreeNode,
} from '@/shared/src/restriction-tree/types'

export abstract class LogicNode implements TreeNode {
  constructor(public readonly children: TreeNode[]) {}

  toStorageFormat(): EncodedLogicNode {
    return {
      type: this.id(),
      children: this.children.map((child) => child.toStorageFormat()),
    }
  }

  abstract resolveTreeNodes(): PlainRestrictionGroups

  abstract id(): LogicNodeType
}
