import type { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'

export type CriteriaMap = Map<CriterionType, CriterionValue>

export enum LogicNodeType {
  OR = 'or',
  AND = 'and',
}

export enum RestrictionNodeType {
  ORIGIN = 'origin',
  CITIZENSHIP = 'citizenship',
  DID_NOT_VISIT_COUNTRIES = 'did-not-visit-countries',
  AGE = 'age',
  VACCINATED = 'vaccinated',
  RECOVERY = 'recovery',
  EU_DIGITAL_CERTIFICATE = 'eu-digital-certificate',

  PCR_TEST = 'pcr-test',
  ONLINE_APPLICATION = 'online-application',
  SUB_DESTINATION = 'sub-destination',
  INSURANCE = 'insurance',
  QUARANTINE = 'quarantine',
  CUSTOM_REQUIREMENT = 'custom-requirement',
}

export const Prerequisites: RestrictionNodeType[] = [
  RestrictionNodeType.ORIGIN,
  RestrictionNodeType.CITIZENSHIP,
  RestrictionNodeType.DID_NOT_VISIT_COUNTRIES,
  RestrictionNodeType.AGE,
  RestrictionNodeType.VACCINATED,
  RestrictionNodeType.RECOVERY,
]

type CriterionType = RestrictionNodeType
type CriterionValue = string | number | boolean | string[]
export type PlainRestrictionGroup<T = AbstractRestrictionNode> = T[]
export type PlainRestrictionGroups<T = PlainRestrictionGroup> = T[]

export interface TreeNode {
  id(): RestrictionNodeType | LogicNodeType
  resolveTreeNodes(): PlainRestrictionGroups
}
