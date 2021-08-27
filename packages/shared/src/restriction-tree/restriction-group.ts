import difference from 'lodash/difference'

import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'
import { RestrictionCategory } from '@/shared/src/restriction-tree/abstract-restriction-node'
import { RestrictionNodeList } from '@/shared/src/restriction-tree/converter'
import { Matcher } from '@/shared/src/restriction-tree/matcher'
import {
  PlainRestrictionGroup,
  PlainRestrictionGroups,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'
import { applyContextToRestrictionGroups } from '@/shared/src/restriction-tree/visitor-profile'

type RawRestrictionGroupCollection = RestrictionGroup[]

export class RestrictionGroupCollection {
  protected matcher?: Matcher
  constructor(
    protected readonly restrictionGroups: PlainRestrictionGroups,
    protected readonly context?: ProfileContext,
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

type MappedMap<A, K extends keyof A = keyof A> = Map<K, A[K]>

export class RestrictionGroup {
  public readonly restrictions: PlainRestrictionGroup = []
  protected readonly indexedGroup: MappedMap<RestrictionNodeList>

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

  public findRestrictionByType<T extends keyof RestrictionNodeList>(
    type: T,
  ): RestrictionNodeList[T] | undefined {
    return this.indexedGroup.get(type) as RestrictionNodeList[T]
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

  get isForbidden(): boolean {
    return this.status === RestrictionStatus.FORBIDDEN
  }

  get hasNoRestrictions(): boolean {
    if (this.indexedGroup.size !== 1) {
      return false
    }

    if (!this.indexedGroup.has(RestrictionNodeType.ORIGIN)) {
      return false
    }

    return true
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

export function createRestrictionGroupCollection(
  restrictions: PlainRestrictionGroups,
  profile: ProfileContext,
): RestrictionGroupCollection {
  return new RestrictionGroupCollection(restrictions, profile)
}
