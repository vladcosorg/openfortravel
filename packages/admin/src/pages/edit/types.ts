import {
  EncodedLogicNode,
  EncodedRestrictionNode,
} from '@/shared/src/restriction-tree/converter'

export type TreeBuilderNode = TreeBuilderLogicNode | TreeBuilderRestrictionNode
export type TreeBuilderLogicNode = {
  UID: number
} & EncodedLogicNode<TreeBuilderNode>
export type TreeBuilderRestrictionNode = {
  UID: number
} & EncodedRestrictionNode
