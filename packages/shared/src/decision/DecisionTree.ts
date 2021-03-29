import { AbstractCriterionNode } from '@/shared/src/decision/AbstractCriterionNode'
import { AndNode } from '@/shared/src/decision/AndNode'
import { OrNode } from '@/shared/src/decision/OrNode'
import { AntigenTest } from '@/shared/src/decision/criteria/AntigenTest'
import { OriginCriteria } from '@/shared/src/decision/criteria/Origin'
import { PCRTest } from '@/shared/src/decision/criteria/PCRTest'
import { Quarantine } from '@/shared/src/decision/criteria/Quarantine'

export type Criteria =
  | typeof OriginCriteria
  | typeof PCRTest
  | typeof Quarantine
  | typeof AntigenTest
export type CriteriaMap = Map<CriteriaType, CriteriaValue>
export type CriteriaType = Criteria | AbstractCriterionNode
export type CriteriaValue = string | number | boolean
export type NodeChildren = Array<AndNode | OrNode | InstanceType<Criteria>>
export type RestrictionGroup = Array<AbstractCriterionNode>
export type Combinations = Array<RestrictionGroup>

export interface ITreeNode {
  resolveWithData(data: CriteriaMap): NodeChildren | boolean | undefined

  generateCombinations(): Combinations
}

export abstract class TreeNode implements ITreeNode {
  constructor(protected readonly children: NodeChildren) {}

  public abstract resolveWithData(data: CriteriaMap): NodeChildren | boolean

  public abstract generateCombinations(): Combinations

  public verbalize(): string {
    return 'lol'
  }
}
