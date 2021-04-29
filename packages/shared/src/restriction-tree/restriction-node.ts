import VueI18n from 'vue-i18n'

import { EncodedRestrictionNode } from '@/shared/src/restriction-tree/converter'
import {
  RestrictionGroups,
  TreeNode,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

export type RestrictionInstruction = { title: string; subtitle?: string }
export enum RestrictionCategory {
  PREREQUISITE = 'prerequisite',
  ACTION = 'action',
}
export type CommonOptions = {
  customInstructionTitle?: string
  customInstructionSubtitle?: string
}
export abstract class RestrictionNode<T extends Record<string, unknown>>
  implements TreeNode {
  constructor(public readonly options: T) {
    this.options = Object.assign(this.getDefaults(), options)
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

  verbalize(i18n: VueI18n): string {
    return i18n.t(`rt.${this.id()}`, this.options) as string
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
