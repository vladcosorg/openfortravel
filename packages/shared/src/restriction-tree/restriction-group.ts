import difference from 'lodash/difference'

import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import {
  RestrictionCategory,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import {
  PlainRestrictionGroup,
  PlainRestrictionGroups,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'
import {
  applyContextToRestrictionGroups,
  VisitorProfile,
} from '@/shared/src/restriction-tree/visitor-profile'

export type RawRestrictionGroupCollection = RestrictionGroup[]

export class RestrictionGroupCollection {
  constructor(
    protected readonly restrictionGroups: PlainRestrictionGroups,
    protected readonly context?: VisitorProfile,
  ) {}

  public getAvailableGroups(): RestrictionGroup[] {
    const contextGroups = this.context
      ? applyContextToRestrictionGroups(this.context, this.restrictionGroups)
      : this.restrictionGroups
    return this.sortGroups(this.wrapGroups([...contextGroups]))
  }

  public getBestGroup(): RestrictionGroup {
    return this.getAvailableGroups()[0]
  }

  public getUnavailableGroups(): RestrictionGroup[] {
    const contextGroups = this.context
      ? applyContextToRestrictionGroups(this.context, this.restrictionGroups)
      : this.restrictionGroups
    const groups = difference(this.restrictionGroups, [...contextGroups])

    return this.sortGroups(this.wrapGroups(groups))
  }

  protected wrapGroups(
    groups: PlainRestrictionGroups,
  ): RawRestrictionGroupCollection {
    return groups.map((group) => new RestrictionGroup(group))
  }

  protected sortGroups<T extends RawRestrictionGroupCollection>(groups: T): T {
    return groups.sort((a, b) => a.penaltyScore - b.penaltyScore)
  }
}

export class RestrictionGroup {
  protected readonly indexedGroup: Map<RestrictionNodeType, RestrictionNode>
  protected readonly restrictions: PlainRestrictionGroup = []
  constructor(restrictions?: PlainRestrictionGroup) {
    this.indexedGroup = new Map(
      restrictions
        ? restrictions.map((restriction) => [restriction.id(), restriction])
        : undefined,
    )

    if (restrictions) {
      this.restrictions = restrictions
    }
  }

  get prerequisites(): PlainRestrictionGroup {
    const filtered = this.restrictions.filter(
      (node) => node.category() === RestrictionCategory.PREREQUISITE,
    )

    return this.sortByDisplayOrder(filtered)
  }

  get actions(): PlainRestrictionGroup {
    const filtered = this.restrictions.filter(
      (node) => node.category() === RestrictionCategory.ACTION,
    )

    return this.sortByDisplayOrder(filtered)
  }

  get status(): RestrictionStatus {
    if (this.indexedGroup.size === 0) {
      return RestrictionStatus.FORBIDDEN
    }

    if (this.indexedGroup.has(RestrictionNodeType.QUARANTINE)) {
      return RestrictionStatus.CONDITIONAL
    }

    return RestrictionStatus.ALLOWED
  }

  get penaltyScore(): number {
    if (this.restrictions === undefined) {
      return 0
    }

    return this.restrictions.reduce(
      (prevScore, restriction) => restriction.penaltyScore() + prevScore,
      0,
    )
  }

  get rating(): 1 | 2 | 3 | 4 | 5 {
    const penaltySum = this.penaltyScore

    if (penaltySum <= 2) {
      return 5
    }

    if (penaltySum <= 4) {
      1
      return 4
    }

    if (penaltySum <= 6) {
      return 3
    }

    if (penaltySum <= 10) {
      return 2
    }

    return 1
  }

  get quarantineRequired(): boolean {
    return this.indexedGroup.has(RestrictionNodeType.QUARANTINE)
  }

  get pcrTestRequired(): boolean {
    return this.indexedGroup.has(RestrictionNodeType.PCR_TEST)
  }

  get insuranceRequired(): boolean {
    return this.indexedGroup.has(RestrictionNodeType.INSURANCE)
  }

  protected sortByDisplayOrder(
    group: PlainRestrictionGroup,
  ): PlainRestrictionGroup {
    {
      return [...group].sort(
        (nodeA, nodeB) => nodeA.displayOrder() - nodeB.displayOrder(),
      )
    }
  }
}
