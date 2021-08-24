import { h } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import Quarantine from '@/front/src/pages/destination/components/restriction-groups/restriction/quarantine.vue'
import { Question } from '@/front/src/pages/destination/questions/question'
import { RenderFunction } from '@/shared/src/misc/type-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class QuarantineQuestion extends Question {
  get id(): string {
    return `do-i-have-to-quarantine-after-${
      this.returning ? 'returning' : 'arriving'
    }-to-${this.destinationFactsheet.destinationSlug}-from-${
      this.originFactsheet.originSlug
    }`
  }

  get question(): RenderFunction {
    return () => [
      `Do I have to quarantine when ${
        this.returning ? 'returning back ' : ' traveling'
      } from `,
      h(CountryLabel, { value: this.originFactsheet.countryCode }),
      ' to ',
      h(CountryLabel, { value: this.destinationFactsheet.countryCode }),
      '?',
    ]
  }

  get answer(): RenderFunction {
    if (this.optimalRestrictionGroup.isForbidden) {
      return () => [
        'Unfortunately you are not permitted to enter ',
        h(CountryLabel, { value: this.destinationFactsheet.countryCode }),
        ' at all, with or without quarantine.',
      ]
    }

    const quarantineRestriction =
      this.optimalRestrictionGroup.findRestrictionByType(
        RestrictionNodeType.QUARANTINE,
      )
    if (quarantineRestriction) {
      return () => [
        `No, you can't ${this.returning ? ' return back' : ' travel'} to `,
        h(CountryLabel, { value: this.destinationFactsheet.countryCode }),
        ' without quarantine.',
        h('br'),
        h('br'),
        h(Quarantine, {
          restriction: quarantineRestriction,
          wrapper: {
            props: ['restriction'],
            render() {
              return this.$slots.subtitle()
            },
          },
        }),
      ]
    }

    return () => [
      `No, you don't need to quarantine upon ${
        this.returning ? ' returning ' : ' arriving'
      } to `,
      h(CountryLabel, { value: this.destinationFactsheet.countryCode }),
      '.',
    ]
  }
}
