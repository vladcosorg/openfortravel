import type { EncodedNode } from '@/shared/src/restriction-tree/converter'
import type { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'

export type CriteriaMap = Map<CriterionType, CriterionValue>

export enum LogicNodeType {
  OR = 'or',
  AND = 'and',
}

export enum RestrictionNodeType {
  ORIGIN = 'origin',
  QUARANTINE = 'quarantine',
  VACCINATED = 'vaccinated',
  RECOVERY = 'recovery',
  PCR_TEST = 'pcr-test',
  AGE = 'age',
  ONLINE_APPLICATION = 'online-application',
  CITIZENSHIP = 'citizenship',
  DID_NOT_VISIT_COUNTRIES = 'did-not-visit-countries',
  INSURANCE = 'insurance',
}

export type CriterionType = RestrictionNodeType
export type CriterionValue = string | number | boolean | string[]
export type RestrictionGroup<T = RestrictionNode> = T[]
export type RestrictionGroups<T = RestrictionGroup> = T[]

export interface TreeNode {
  id(): RestrictionNodeType | LogicNodeType
  resolveTreeNodes(): RestrictionGroups
  toStorageFormat(): EncodedNode
}
