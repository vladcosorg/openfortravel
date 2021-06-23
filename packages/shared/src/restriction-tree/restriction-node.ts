import type {
  PlainRestrictionGroups,
  TreeNode,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export enum RestrictionCategory {
  PREREQUISITE = 'prerequisite',
  ACTION = 'action',
}

export enum Placement {
  APPEND = 'append',
  PREPEND = 'prepend',
  REPLACE = 'replace',
}

export abstract class RestrictionNode<
  T extends Record<string, unknown> &
    typeof RestrictionNode.defaultOptions = typeof RestrictionNode.defaultOptions,
> implements TreeNode
{
  static defaultOptions = {
    customInstructionTitle: undefined as string | undefined,
    customInstructionSubtitle: undefined as string | undefined,
    customContentPlacement: Placement.APPEND as Placement,
    customTitlePlacement: Placement.APPEND as Placement,
  }

  constructor(public readonly options: T) {}

  displayOrder(): number {
    return 0
  }

  penaltyScore(): number {
    return 0
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }

  resolveTreeNodes(): PlainRestrictionGroups {
    return [[this]]
  }

  matches(value: unknown): boolean {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Not implemented ${this.id()}:${value}`)
  }

  toI18nConfig(): [string, Record<string, unknown>?] {
    return [this.id(), this.options]
  }

  abstract id(): RestrictionNodeType
}
