import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { isLogicNode } from '@/shared/src/restriction-tree/guards'
import { And } from '@/shared/src/restriction-tree/logic-node/and'
import { Or } from '@/shared/src/restriction-tree/logic-node/or'
import { Age } from '@/shared/src/restriction-tree/restriction-node/age'
import { Citizenship } from '@/shared/src/restriction-tree/restriction-node/citizenship'
import { CustomRequirement } from '@/shared/src/restriction-tree/restriction-node/custom-requirement'
import { DidNotVisitCountries } from '@/shared/src/restriction-tree/restriction-node/did-not-visit-countries'
import { EuDigitalCertificate } from '@/shared/src/restriction-tree/restriction-node/eu-digital-certificate'
import { Insurance } from '@/shared/src/restriction-tree/restriction-node/insurance'
import { OnlineApplication } from '@/shared/src/restriction-tree/restriction-node/online-application'
import { Origin } from '@/shared/src/restriction-tree/restriction-node/origin'
import { PcrTest } from '@/shared/src/restriction-tree/restriction-node/pcr-test'
import { Quarantine } from '@/shared/src/restriction-tree/restriction-node/quarantine'
import { RecoveryCertificate } from '@/shared/src/restriction-tree/restriction-node/recovery-certificate'
import { SubDestination } from '@/shared/src/restriction-tree/restriction-node/sub-destination'
import { Vaccinated } from '@/shared/src/restriction-tree/restriction-node/vaccinated'
import type { TreeNode } from '@/shared/src/restriction-tree/types'
import {
  LogicNodeType,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export type EncodedTreeNode = EncodedRestrictionNode | EncodedLogicNode

export type IncompleteEncodedNode = Partial<EncodedTreeNode>

export type EncodedRestrictionNode<
  T = typeof AbstractRestrictionNode['defaultOptions'],
> = {
  type: RestrictionNodeType
  options: T
  comment?: string
  group?: string
}
export interface EncodedLogicNode<T extends EncodedTreeNode = EncodedTreeNode> {
  type: LogicNodeType
  children: T[]
  comment?: string
}

export const typeConstructors = {
  [LogicNodeType.OR]: Or,
  [LogicNodeType.AND]: And,
  [RestrictionNodeType.ORIGIN]: Origin,
  [RestrictionNodeType.SUB_DESTINATION]: SubDestination,
  [RestrictionNodeType.QUARANTINE]: Quarantine,
  [RestrictionNodeType.VACCINATED]: Vaccinated,
  [RestrictionNodeType.RECOVERY]: RecoveryCertificate,
  [RestrictionNodeType.PCR_TEST]: PcrTest,
  [RestrictionNodeType.EU_DIGITAL_CERTIFICATE]: EuDigitalCertificate,
  [RestrictionNodeType.ONLINE_APPLICATION]: OnlineApplication,
  [RestrictionNodeType.CITIZENSHIP]: Citizenship,
  [RestrictionNodeType.DID_NOT_VISIT_COUNTRIES]: DidNotVisitCountries,
  [RestrictionNodeType.INSURANCE]: Insurance,
  [RestrictionNodeType.AGE]: Age,
  [RestrictionNodeType.CUSTOM_REQUIREMENT]: CustomRequirement,
}

export type RestrictionNodeList = {
  [key in RestrictionNodeType]: InstanceType<typeof typeConstructors[key]>
}

export function convertFromStorageFormat<T extends EncodedTreeNode>(
  nodeTree: T,
): TreeNode {
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
      nodeTree.children
        .filter(
          (child) =>
            (isLogicNode(child) && child.children.length > 0) ||
            !isLogicNode(child),
        )
        .map((child) => convertFromStorageFormat(child)),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new constructor(nodeTree.options)
}
