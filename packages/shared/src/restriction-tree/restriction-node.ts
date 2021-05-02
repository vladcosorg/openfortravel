import type { EncodedRestrictionNode } from '@/shared/src/restriction-tree/converter'
import type {
  RestrictionGroups,
  TreeNode,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export enum RestrictionCategory {
  PREREQUISITE = 'prerequisite',
  ACTION = 'action',
}

export abstract class RestrictionNode<
  T extends Record<string, unknown> &
    typeof RestrictionNode.defaultOptions = typeof RestrictionNode.defaultOptions
> implements TreeNode {
  static defaultOptions = {
    customInstructionTitle: '',
    customInstructionSubtitle: '',
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

  resolveTreeNodes(): RestrictionGroups {
    return [[this]]
  }

  matches(value: unknown): boolean {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Not implemented ${this.id()}:${value}`)
  }

  toI18nConfig(): [string, Record<string, unknown>?] {
    return [this.id(), this.options]
  }

  toStorageFormat(): EncodedRestrictionNode {
    const out: EncodedRestrictionNode = {
      type: this.id(),
    }

    if (this.options) {
      out.options = this.options
    }

    return out
  }

  abstract id(): RestrictionNodeType
}
