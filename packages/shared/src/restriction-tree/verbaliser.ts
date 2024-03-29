import type {
  PlainRestrictionGroups,
  RestrictionNodeType,
} from '@/shared/src/restriction-tree/types'

import type VueI18n from 'vue-i18n'

export class Verbaliser {
  constructor(
    protected readonly restrictionGroups: PlainRestrictionGroups,
    protected readonly translator?: VueI18n,
  ) {}

  narrate(): string {
    const out: string[] = []
    for (const group of this.restrictionGroups) {
      out.push(
        group.map((restriction) => restriction.toI18nConfig()[0]).join(' and '),
      )
    }
    return out.join(' OR ')
  }

  focusOn(...restrictionsToInclude: RestrictionNodeType[]): Verbaliser {
    return new Verbaliser(
      this.restrictionGroups
        .map((restrictionGroup) =>
          restrictionGroup.filter((criterion) =>
            restrictionsToInclude.includes(criterion.id()),
          ),
        )
        .filter((group) => group.length),
    )
  }
}
