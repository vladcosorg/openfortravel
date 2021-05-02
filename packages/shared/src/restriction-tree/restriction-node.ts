import type { EncodedRestrictionNode } from '@/shared/src/restriction-tree/converter'
import type {
  RestrictionGroups,
  TreeNode,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'
import type { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

export type RestrictionInstruction = { title: string; subtitle?: string }
export enum RestrictionCategory {
  PREREQUISITE = 'prerequisite',
  ACTION = 'action',
}

export abstract class RestrictionNode<T extends Record<string, unknown> = {}>
  implements TreeNode {
  constructor(public readonly options: T) {
    this.options = Object.assign(this.getDefaults(), options)
  }

  public static defaultOptions = {
    customInstructionTitle: '',
    customInstructionSubtitle: '',
  }

  abstract id(): RestrictionNodeType

  displayOrder(): number {
    return 0
  }

  penaltyScore(): number {
    return 0
  }

  protected getDefaults(): T {
    return {} as T
  }

  category(): RestrictionCategory {
    return RestrictionCategory.PREREQUISITE
  }

  resolveTreeNodes(): RestrictionGroups {
    return [[this]]
  }

  matches(value: unknown): boolean {
    throw new Error(`Not implemented ${this.id()}:${value}`)
  }

  toI18nConfig(): [string, Record<string, unknown>?] {
    return [this.id(), this.options]
  }

  instruction(_context: VisitorContext): RestrictionInstruction {
    return {
      title: this.id(),
    }
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
}
