import difference from 'lodash/difference'
import groupBy from 'lodash/groupBy'

import type { Matcher } from '@/shared/src/restriction-tree/matcher'
import type { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import type {
  RestrictionGroup,
  RestrictionGroups,
} from '@/shared/src/restriction-tree/types'
import type { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

type MergedRestrictionGroup = Array<RestrictionNode | RestrictionNode[]>
type MergedRestrictionNodesGroups = RestrictionGroups<MergedRestrictionGroup>

export type RestrictionsGroupesWithScore = Array<{
  score: number
  group: RestrictionGroup
}>

type CategorizedRestrictionsGroupesWithScore = Array<{
  score: number
  group: RestrictionGroup
}>

export class EntryWays {
  constructor(
    protected readonly matcher: Matcher,
    protected readonly context: VisitorContext,
  ) {}

  protected sortGroupsByIndex(
    groups: MergedRestrictionNodesGroups,
  ): MergedRestrictionNodesGroups {
    for (const group of groups) {
      group.sort((nodeOrSubgroupA, nodeOrSubgroupB) => {
        if (
          !Array.isArray(nodeOrSubgroupA) &&
          !Array.isArray(nodeOrSubgroupB)
        ) {
          return nodeOrSubgroupA.displayOrder() - nodeOrSubgroupB.displayOrder()
        } else if (
          Array.isArray(nodeOrSubgroupA) &&
          !Array.isArray(nodeOrSubgroupB)
        ) {
          return 1
        } else if (
          !Array.isArray(nodeOrSubgroupA) &&
          Array.isArray(nodeOrSubgroupB)
        ) {
          return -1
        }

        return 0
      })
    }
    return groups
  }

  protected convertPenaltiesToRating(group: RestrictionGroup): number {
    const penaltySum = group.reduce(
      (prevScore, restriction) => restriction.penaltyScore() + prevScore,
      0,
    )

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

  protected calculatePenaltiesAndSortByScore(
    groups: RestrictionGroups,
  ): RestrictionsGroupesWithScore {
    const scoredGroups = groups.reduce<RestrictionsGroupesWithScore>(
      (acc, group) => {
        acc.push({
          score: this.convertPenaltiesToRating(group),
          group,
        })
        return acc
      },
      [],
    )

    scoredGroups.sort((groupA, groupB) => groupB.score - groupA.score)
    return scoredGroups
  }

  protected groupByRestrictionCategory(
    groups: RestrictionsGroupesWithScore,
  ): CategorizedRestrictionsGroupesWithScore {
    return (groups.map((group) => ({
      group: groupBy(group.group, (node) => node.category()),
      score: group.score,
    })) as unknown) as CategorizedRestrictionsGroupesWithScore
  }

  protected formatGroups(
    groups: RestrictionGroups,
  ): CategorizedRestrictionsGroupesWithScore {
    this.sortGroupsByIndex(groups)
    return this.groupByRestrictionCategory(
      this.calculatePenaltiesAndSortByScore(groups),
    )
  }

  getGroups(): {
    available: CategorizedRestrictionsGroupesWithScore
    unavailable: CategorizedRestrictionsGroupesWithScore
  } {
    const allGroups = this.matcher.getGroups()

    const availableGroups = this.context
      .applyToMatcher(this.matcher)
      .getGroups()

    const unvailableGroups = difference(allGroups, availableGroups)
    return {
      available: this.formatGroups(availableGroups),
      unavailable: this.formatGroups(unvailableGroups),
    }
  }

  getOptimalGroup(): RestrictionGroup | undefined {
    const availableGroups = this.context
      .applyToMatcher(this.matcher)
      .getGroups()

    const scoredGroups = this.calculatePenaltiesAndSortByScore(availableGroups)

    return scoredGroups.shift()?.group
  }
}
