import omit from 'lodash/omit'

import type { Destination } from '@/shared/src/api/destinations/models'
import type {
  EncodedLogicNode,
  EncodedNode,
  EncodedRestrictionNode,
} from '@/shared/src/restriction-tree/converter'
import { LogicNodeType } from '@/shared/src/restriction-tree/types'

export type ScopedNodeData = { key: number }
export type QuasarTreeNode = QuasarLogicTreeNode | QuasarRestrictionTreeNode
export type QuasarLogicTreeNode = {
  UID: number
  children: QuasarTreeNode[]
} & EncodedLogicNode
export type QuasarRestrictionTreeNode = {
  UID: number
  showCustom: boolean
} & EncodedRestrictionNode
export type ExtractRestrictionOptions<T extends { new (...args: any): any }> =
  ConstructorParameters<T>[0]

export function indexTheTree(
  nodes: EncodedNode[],
  getNextUID: () => number,
): QuasarTreeNode[] {
  const index = (nodes: EncodedNode[]): QuasarTreeNode[] =>
    nodes.map((node) => {
      const out: QuasarTreeNode = {
        ...node,
        UID: getNextUID(),
        showCustom: false,
      }

      if ('children' in node) {
        ;(out as QuasarTreeNode & EncodedLogicNode).children = index(
          node.children,
        )
      }

      return out
    })

  return index(nodes)
}

export function prepareForStorage(
  indexedTree: QuasarTreeNode[],
): EncodedNode[] {
  const rootNode = indexedTree[0] as QuasarLogicTreeNode

  if (!rootNode || !rootNode.children) {
    return []
  }

  return cleanObjectRecursive(rootNode.children)
}

function cleanObjectRecursive(indexedTree: QuasarTreeNode[]): EncodedNode[] {
  const out: EncodedNode[] = []

  for (const node of indexedTree) {
    out.push(
      omit(
        Object.assign(
          {},
          node,
          'children' in node
            ? {
                children: cleanObjectRecursive(node.children),
              }
            : {},
        ),
        ['UID', 'showCustom'],
      ) as EncodedNode,
    )
  }

  return out
}

export function createIndexedTree(
  destination: Destination,
  getNextUID: () => number,
): QuasarTreeNode[] {
  return indexTheTree(
    [
      {
        type: LogicNodeType.OR,
        children: destination.restrictionTree,
      },
    ],
    getNextUID,
  )
}
