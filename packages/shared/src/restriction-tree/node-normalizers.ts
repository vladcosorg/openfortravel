import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

import {
  NormalizedEncodedLogicNode,
  NormalizedEncodedNode,
  NormalizedEncodedRestrictionNode,
  typeConstructors,
} from '@/shared/src/restriction-tree/converter'
import { isLogicNodeType } from '@/shared/src/restriction-tree/guards'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export function createDefaultLogicNodeForType(
  type: LogicNodeType,
): NormalizedEncodedLogicNode {
  return {
    type,
    children: [],
  }
}

export function normalizeEncodedLogicNode(
  node: Partial<NormalizedEncodedLogicNode>,
): NormalizedEncodedLogicNode {
  if (!node.type) {
    throw new Error('Undefined type')
  }

  return merge(createDefaultLogicNodeForType(node.type), node)
}

export function createDefaultRestrictionNodeForType(
  type: RestrictionNodeType,
): NormalizedEncodedRestrictionNode {
  const defaultOptions = cloneDeep(typeConstructors[type].defaultOptions)

  return {
    type,
    options: defaultOptions,
  }
}

export function normalizeEncodedRestrictionNode(
  node: Partial<NormalizedEncodedRestrictionNode>,
): NormalizedEncodedRestrictionNode {
  if (!node.type) {
    throw new Error('Undefined type')
  }

  return merge(createDefaultRestrictionNodeForType(node.type), node)
}

export function createDefaultNodeOfType(
  type: RestrictionNodeType | LogicNodeType,
): NormalizedEncodedNode {
  return isLogicNodeType(type)
    ? createDefaultLogicNodeForType(type)
    : createDefaultRestrictionNodeForType(type)
}

export function normalizeEncodedNode(
  node: Partial<NormalizedEncodedNode>,
): NormalizedEncodedNode {
  if (!node.type) {
    throw new Error('Undefined type')
  }

  return isLogicNodeType(node.type)
    ? normalizeEncodedLogicNode(node as Partial<NormalizedEncodedLogicNode>)
    : normalizeEncodedRestrictionNode(
        node as Partial<NormalizedEncodedRestrictionNode>,
      )
}
