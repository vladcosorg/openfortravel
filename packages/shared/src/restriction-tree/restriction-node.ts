import { EncodedRestrictionNode } from '@/shared/src/restriction-tree/converter'
import {
  RestrictionGroups,
  TreeNode,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

export abstract class RestrictionNode implements TreeNode {
  protected options?: Record<string, unknown>

  abstract id(): RestrictionNodeType

  resolveTreeNodes(): RestrictionGroups {
    return [[this]]
  }

  matches(value: unknown): boolean {
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
}
