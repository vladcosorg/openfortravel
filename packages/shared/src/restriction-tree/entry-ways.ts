import difference from 'lodash/difference'
import groupBy from 'lodash/groupBy'
import intersection from 'lodash/intersection'
import mapValues from 'lodash/mapValues'
import xor from 'lodash/xor'

import { Matcher } from '@/shared/src/restriction-tree/matcher'
import {
  RestrictionCategory,
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionGroups } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

type MergedRestrictionGroup = Array<RestrictionNode | RestrictionNode[]>
type MergedRestrictionNodesGroups = RestrictionGroups<MergedRestrictionGroup>
export type RestrictionsGroupesWithScore = {
  score: number
  group: Array<RestrictionInstruction | RestrictionInstruction[]>
}[]

export class EntryWays {
  constructor(
    protected readonly matcher: Matcher,
    protected readonly context: VisitorContext,
  ) {}

  mergeSimilarGroups(groups: RestrictionGroups): MergedRestrictionNodesGroups {
    let out: MergedRestrictionNodesGroups = []
    const nodesGroupedByLength = groupBy(groups, (group) => group.length)

    for (const [strLength, items] of Object.entries(nodesGroupedByLength)) {
      const length = Number.parseInt(strLength, 10)
      if (length < 2) {
        out = [...out, ...items]
        continue
      }

      const commonBase = intersection(...items)

      if (commonBase.length !== length - 1) {
        out = [...out, ...items]
        continue
      }

      out.push([...commonBase, xor(...items)])
    }

    return out
  }

  protected sortGroupsByIndex(
    groups: MergedRestrictionNodesGroups,
  ): MergedRestrictionNodesGroups {
    for (const group of groups) {
      group.sort((nodeOrSubgroupA, nodeOrSubgroupB) => {
        if (!Array.isArray(nodeOrSubgroupA) && !Array.isArray(nodeOrSubgroupB)) {
          return nodeOrSubgroupA.displayOrder() - nodeOrSubgroupB.displayOrder()
        } else if (Array.isArray(nodeOrSubgroupA) && !Array.isArray(nodeOrSubgroupB)) {
          return 1
        } else if (!Array.isArray(nodeOrSubgroupA) && Array.isArray(nodeOrSubgroupB)) {
          return -1
        }

        return 0
      })
    }
    return groups
  }

  protected convertPenaltiesToRating(group: MergedRestrictionGroup): number {
    const penaltySum = group.reduce((prevScore, restriction) => {
      if (Array.isArray(restriction)) {
        return (
          Math.max(...restriction.map((restriction) => restriction.penaltyScore())) + prevScore
        )
      }

      return restriction.penaltyScore() + prevScore
    }, 0)

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

  protected calculatePenaltiesAndSortByScore(
    groups: RestrictionGroups<Record<RestrictionCategory, RestrictionNode[]>>,
  ): RestrictionsGroupesWithScore {
    const scoredGroups = groups.reduce<RestrictionsGroupesWithScore>((acc, group) => {
      acc.push({
        score: this.convertPenaltiesToRating([...Object.values(group)]),
        group: mapValues(group, (restrictionGroup) =>
          restrictionGroup.map((restriction) => restriction.instruction(this.context)),
        ),
      })
      return acc
    }, [])

    scoredGroups.sort((groupA, groupB) => groupB.score - groupA.score)
    return scoredGroups
  }

  protected groupByRestrictionCategory(
    groups: RestrictionGroups,
  ): RestrictionGroups<Record<RestrictionCategory, RestrictionNode[]>> {
    return groups.map((group) => groupBy(group, (node) => node.category())) as any
  }

  protected formatGroups(groups: RestrictionGroups): RestrictionsGroupesWithScore {
    // const mergedGroups = this.mergeSimilarGroups(groups)
    this.sortGroupsByIndex(groups)
    return this.calculatePenaltiesAndSortByScore(this.groupByRestrictionCategory(groups))
  }

  getGroups(): {
    available: RestrictionsGroupesWithScore
    unavailable: RestrictionsGroupesWithScore
  } {
    const allGroups = this.matcher.getGroups()

    const availableGroups = this.context.applyToMatcher(this.matcher).getGroups()

    const unvailableGroups = difference(allGroups, availableGroups)
    return {
      available: this.formatGroups(availableGroups),
      unavailable: this.formatGroups(unvailableGroups),
    }
  }
}
