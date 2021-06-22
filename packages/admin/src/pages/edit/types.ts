import {
  NormalizedEncodedLogicNode,
  NormalizedEncodedRestrictionNode,
} from '@/shared/src/restriction-tree/converter'

export type TreeBuilderNode = TreeBuilderLogicNode | TreeBuilderRestrictionNode
export type TreeBuilderLogicNode = {
  UID: number
} & NormalizedEncodedLogicNode<TreeBuilderNode>
export type TreeBuilderRestrictionNode = {
  UID: number
} & NormalizedEncodedRestrictionNode
