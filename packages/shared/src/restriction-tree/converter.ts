import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { AntigenTest } from '@/shared/src/restriction-tree/restriction-node/antigen-test'
import { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { QuarantineWithTesting } from '@/shared/src/restriction-tree/restriction-node/quarantine-with-testing'
import { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import {
  LogicNodeType,
  RestrictionNodeType,
  TreeNode,
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
  [RestrictionNodeType.QUARANTINE_WITH_TEST]: QuarantineWithTesting,
  [RestrictionNodeType.VACCINATED]: Vaccinated,
  [RestrictionNodeType.RECOVERY]: RecoveryCertificate,
  [RestrictionNodeType.PCR_TEST]: PcrTest,
  [RestrictionNodeType.ANTIGEN_TEST]: AntigenTest,
  [RestrictionNodeType.ONLINE_APPLICATION]: OnlineApplication,
  [RestrictionNodeType.CITIZENSHIP]: Citizenship,
  [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: DidNotVisitCountries,
}

export function convertFromStorageFormat(nodeTree: EncodedNode): TreeNode {
  if (!nodeTree.type) {
    throw new Error('Malformed tree: type is not specified')
  }

  const constructor = typeConstructors[nodeTree.type]

  if (!constructor) {
    throw new Error(`Malformed tree: There is not constructor for type ${nodeTree.type}`)
  }

  if (isLogicNode(nodeTree)) {
    if (!nodeTree.children || nodeTree.children.length === 0) {
      throw new Error(`Malformed tree. The ${nodeTree.type} should always have children`)
    }

    return new (constructor as typeof Or | typeof And)(
      nodeTree.children.map((child) => convertFromStorageFormat(child)),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new constructor(nodeTree.options as any)
}

function isLogicNode(node: EncodedNode): node is EncodedLogicNode {
  const type = (node as EncodedLogicNode).type
  return Object.values(LogicNodeType).includes(type)
}
