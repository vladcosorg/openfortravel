import { h } from 'vue'

import { useCustomI18n } from '@/front/src/modules/i18n/composables'
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
    const { tl } = useCustomI18n()
    return () =>
      h('div', {
        innerHTML: tl(
          `page.destination.widgets.faq.quarantine.q.${
            this.returning ? 'returning' : 'outgoing'
          }`,
          {
            origin: this.originFactsheet.countryCode,
            destination: this.destinationFactsheet.countryCode,
          },
        ),
      })
  }

  get answer(): RenderFunction {
    const { tl } = useCustomI18n()
    if (this.optimalRestrictionGroup.isForbidden) {
      return () =>
        tl('page.destination.widgets.faq.quarantine.a.forbidden', {
          origin: this.originFactsheet.countryCode,
          destination: this.destinationFactsheet.countryCode,
        })
    }

    const quarantineRestriction =
      this.optimalRestrictionGroup.findRestrictionByType(
        RestrictionNodeType.QUARANTINE,
      )
    if (quarantineRestriction) {
      return () => [
        tl(
          `page.destination.widgets.faq.quarantine.a.notAllowed.${
            this.returning ? 'returning' : 'outgoing'
          }`,
          {
            origin: this.originFactsheet.countryCode,
            destination: this.destinationFactsheet.countryCode,
          },
        ),
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

    return () =>
      tl('page.destination.widgets.faq.quarantine.a.allowed', {
        origin: this.originFactsheet.countryCode,
        destination: this.destinationFactsheet.countryCode,
      })
  }
}
