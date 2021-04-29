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

export const vaccineLabels = {
  [VaccineBrand.MODERNA]: 'Moderna',
  [VaccineBrand.NOVAVAX]: 'Novavax',
  [VaccineBrand.ASTRA_ZENEKA]: 'Oxford–AstraZeneca',
  [VaccineBrand.SINOPHARM]: 'Sinopharm (BBIBP-CorV)',
  [VaccineBrand.COVAXIN]: 'Covaxin (BBV152)',
  [VaccineBrand.PFIZER]: 'Pfizer-BioNTech',
  [VaccineBrand.SPUTNIK]: 'Sputnik V',
  [VaccineBrand.JOHNSON_AND_JOHNSON]: 'Johnson & Johnson’s Janssen',
  [VaccineBrand.CONVIDECIA]: 'Convidecia (AD5-nCOV)',
  [VaccineBrand.SINOVAC]: 'CoronaVac (Sinovac)',
}

type Options = {
  daysAgo: number
  authorizedBrands: VaccineBrand[]
  languages: string[]
}
export class Vaccinated extends RestrictionNode<Options> {
  protected getDefaults(): Options {
    return {
      daysAgo: 0,
      authorizedBrands: [],
      languages: [],
    }
  }

  matches(userValue: number): boolean {
    return !this.options.daysAgo || userValue >= this.options.daysAgo
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
