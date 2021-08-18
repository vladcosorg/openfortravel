import { h } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { OneWayTripCard } from '@/front/src/models/one-way-trip-card'
import Quarantine from '@/front/src/pages/destination/components/restriction-groups/restriction/quarantine.vue'
import { Question } from '@/front/src/pages/destination/questions/question'
import { RenderFunction } from '@/shared/src/misc/type-helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export class QuarantineQuestion extends Question {
  constructor(
    public readonly trip: OneWayTripCard,
    protected readonly returning = false,
  ) {
    super(trip)
  }
  get id(): string {
    return `do-i-have-to-quarantine-after-${
      this.returning ? 'returning' : 'arriving'
    }-to-${this.trip.destination.destinationSlug}-from-${
      this.trip.origin.originSlug
    }`
  }

  get question(): RenderFunction {
    return () => [
      `Do I have to quarantine when ${
        this.returning ? 'returning back ' : ' traveling'
      } from `,
      h(CountryLabel, { value: this.trip.originISO }),
      ' to ',
      h(CountryLabel, { value: this.trip.destinationISO }),
      '?',
    ]
  }

  get answer(): RenderFunction {
    if (this.trip.isForbidden) {
      return () => [
        'Unfortunately you are not permitted to enter ',
        h(CountryLabel, { value: this.trip.destinationISO }),
        ' at all, with or without quarantine.',
      ]
    }

    const quarantineRestriction = this.trip.bestGroup.findRestrictionByType(
      RestrictionNodeType.QUARANTINE,
    )
    if (quarantineRestriction) {
      return () => [
        `No, you can't ${this.returning ? ' return back' : ' travel'} to `,
        h(CountryLabel, { value: this.trip.destinationISO }),
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
      h(CountryLabel, { value: this.trip.destinationISO }),
      '.',
    ]
  }
}
