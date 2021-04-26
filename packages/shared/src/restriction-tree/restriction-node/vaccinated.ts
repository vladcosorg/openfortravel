import { useI18nWithPrefix } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import {
  RestrictionInstruction,
  RestrictionNode,
} from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorContext } from '@/shared/src/restriction-tree/visitor-context'

export enum VaccineBrand {
  MODERNA = 'moderna',
  PFIZER = 'pfizer',
  SPUTNIK = 'sputnik',
  ASTRA_ZENEKA = 'astrazeneca',
  SINOPHARM = 'sinopharm',
  SINOVAC = 'sinovac',
  NOVAVAX = 'novavax',
  JOHNSON_AND_JOHNSON = 'jj',
  COVAXIN = 'covaxin',
  CONVIDECIA = 'convidecia',
}

export class Vaccinated extends RestrictionNode {
  constructor(
    protected readonly options: {
      daysAgo: number
      authorizedBrands: VaccineBrand[]
    },
  ) {
    super()
  }

  matches(userValue: number): boolean {
    return userValue >= this.options.daysAgo
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.VACCINATED
  }

  instruction(context: VisitorContext): RestrictionInstruction {
    const { t } = useI18nWithPrefix('rt.vaccinated')
    return {
      title: t('instruction.heading', {
        origin: getLabelForCountryCode(context.origin),
      }) as string,
      subtitle: t('instruction.subtitle') as string,
    }
  }
}
