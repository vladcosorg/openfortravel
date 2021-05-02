import { Question } from '@/front/src/pages/destination/questions/question'
import type { Destination } from '@/shared/src/api/destinations/models'
import type { Restriction } from '@/shared/src/api/restrictions/models'
import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import type { Responder } from '@/shared/src/restriction-tree/responder'

const { t } = useI18nWithPrefix<string>('faq.canITravelToCountry')
export class QuarantineQuestion extends Question {
  constructor(
    protected readonly restriction: Restriction,
    protected readonly destination: Destination,
    protected readonly restrictionTree: Responder,
  ) {
    super(restriction, destination)
  }
  get id(): string {
    return `do-i-have-to-quarantine-after-arriving-to-${this.restriction.destinationSlug}-from-${this.restriction.originSlug}`
  }
  get question(): string {
    return 'Quarantine required?'
  }

  get answer(): string {
    // if (!this.restrictionTree.isQuarantineRequired()) {
    //   return 'No'
    // }
    //
    // const quarantineGroups = this.restrictionTree.getQuarantineRestrictions()
    // console.log(quarantineGroups.map((quarantine) => quarantine.toI18nConfig()))
    return 'ye'
  }
}
