import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

import {
  EncodedLogicNode,
  EncodedTreeNode,
  EncodedRestrictionNode,
  typeConstructors,
  IncompleteEncodedNode,
  IncompleteEncodedNodeCollection,
} from '@/shared/src/restriction-tree/converter'
import { isLogicNodeType } from '@/shared/src/restriction-tree/guards'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export function createDefaultLogicNodeForType(
  type: LogicNodeType,
): EncodedLogicNode {
  return {
    type,
    children: [],
  }
}

export function normalizeEncodedLogicNode(
  node: Partial<EncodedLogicNode>,
): EncodedLogicNode {
  if (!node.type) {
    throw new Error('Undefined type')
  }

  return merge(createDefaultLogicNodeForType(node.type), node)
}

export function createDefaultRestrictionNodeForType(
  type: RestrictionNodeType,
): EncodedRestrictionNode {
  const defaultOptions = cloneDeep(typeConstructors[type].defaultOptions)

  return {
    type,
    options: defaultOptions,
  }
}

export function normalizeEncodedRestrictionNode(
  node: Partial<EncodedRestrictionNode>,
): EncodedRestrictionNode {
  if (!node.type) {
    throw new Error('Undefined type')
  }

  return merge(createDefaultRestrictionNodeForType(node.type), node)
}

export function createDefaultNodeOfType(
  type: RestrictionNodeType | LogicNodeType,
): EncodedTreeNode {
  return isLogicNodeType(type)
    ? createDefaultLogicNodeForType(type)
    : createDefaultRestrictionNodeForType(type)
}

export function normalizeEncodedNode(
  node: IncompleteEncodedNode,
): EncodedTreeNode {
  if (!node.type) {
    throw new Error('Undefined type')
  }

  return isLogicNodeType(node.type)
    ? normalizeEncodedLogicNode(node as Partial<EncodedLogicNode>)
    : normalizeEncodedRestrictionNode(node as Partial<EncodedRestrictionNode>)
}

export function normalizeRecursively(
  tree: IncompleteEncodedNodeCollection,
): EncodedTreeNode[] {
  const out: EncodedTreeNode[] = []
  for (const node of tree) {
    if (node.type === LogicNodeType.OR || node.type === LogicNodeType.AND) {
      out.push(
        Object.assign(node, {
          children: normalizeRecursively(
            node.children as IncompleteEncodedNodeCollection,
          ),
        }) as EncodedTreeNode,
      )
      continue
    }

    out.push(normalizeEncodedNode(node))
  }
  return out
}

export function normalizeTree(
  tree: IncompleteEncodedNodeCollection,
): EncodedTreeNode[] {
  return normalizeRecursively(cloneDeep(tree) ?? [])
}
