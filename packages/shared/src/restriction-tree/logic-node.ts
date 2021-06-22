import type {
  LogicNodeType,
  PlainRestrictionGroups,
  TreeNode,
} from '@/shared/src/restriction-tree/types'

export abstract class LogicNode implements TreeNode {
  constructor(public readonly children: TreeNode[]) {}

  abstract resolveTreeNodes(): PlainRestrictionGroups

  abstract id(): LogicNodeType
}
