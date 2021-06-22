import {
  EncodedLogicNode,
  EncodedTreeNode,
  EncodedRestrictionNode,
} from '@/shared/src/restriction-tree/converter'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export function isLogicNodeType(
  type: LogicNodeType | RestrictionNodeType,
): type is LogicNodeType {
  return Object.values(LogicNodeType).includes(type as LogicNodeType)
}

export function isRestrictionNodeType(
  type: LogicNodeType | RestrictionNodeType,
): type is RestrictionNodeType {
  return Object.values(RestrictionNodeType).includes(
    type as RestrictionNodeType,
  )
}

export function isLogicNode(node: EncodedTreeNode): node is EncodedLogicNode {
  return isLogicNodeType(node.type)
}

export function isRestrictionNode(
  node: EncodedTreeNode,
): node is EncodedRestrictionNode {
  return isRestrictionNodeType(node.type)
}
