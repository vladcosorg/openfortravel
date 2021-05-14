import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'
import { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'
import { Insurance } from '@/shared/src/restriction-tree/restriction-node/insurance'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import type { TreeNode } from '@/shared/src/restriction-tree/types'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export type EncodedNode = EncodedLogicNode | EncodedRestrictionNode
export type EncodedRestrictionNode = {
  type: RestrictionNodeType
  options?: Record<string, unknown>
}
export type EncodedLogicNode = {
  type: LogicNodeType
  children: Array<EncodedLogicNode | EncodedRestrictionNode>
}

export const typeConstructors = {
  [LogicNodeType.OR]: Or,
  [LogicNodeType.AND]: And,
  [RestrictionNodeType.ORIGIN]: Origin,
  [RestrictionNodeType.QUARANTINE]: Quarantine,
  [RestrictionNodeType.VACCINATED]: Vaccinated,
  [RestrictionNodeType.RECOVERY]: RecoveryCertificate,
  [RestrictionNodeType.PCR_TEST]: PcrTest,
  [RestrictionNodeType.ONLINE_APPLICATION]: OnlineApplication,
  [RestrictionNodeType.CITIZENSHIP]: Citizenship,
  [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: DidNotVisitCountries,
  [RestrictionNodeType.INSURANCE]: Insurance,
  [RestrictionNodeType.AGE]: Age,
}

export function convertFromStorageFormat(nodeTree: EncodedNode): TreeNode {
  if (!nodeTree.type) {
    throw new Error('Malformed tree: type is not specified')
  }

  const constructor = typeConstructors[nodeTree.type]

  if (!constructor) {
    throw new Error(
      `Malformed tree: There is not constructor for type ${nodeTree.type}`,
    )
  }

  if (isLogicNode(nodeTree)) {
    if (!nodeTree.children || nodeTree.children.length === 0) {
      nodeTree.children = []
    }

    return new (constructor as typeof Or | typeof And)(
      nodeTree.children.map((child) => convertFromStorageFormat(child)),
    )
  }

  const defaultOptions = (constructor as typeof Origin).defaultOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new constructor(Object.assign({}, defaultOptions, nodeTree.options))
}

function isLogicNode(node: EncodedNode): node is EncodedLogicNode {
  const type = (node as EncodedLogicNode).type
  return Object.values(LogicNodeType).includes(type)
}
