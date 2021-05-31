import { RestrictionNode } from '@/shared/src/restriction-tree/restriction-node'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

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

export const singleShotVaccines = [VaccineBrand.JOHNSON_AND_JOHNSON]

export class Vaccinated extends RestrictionNode<
  typeof Vaccinated.defaultOptions
> {
  static defaultOptions = {
    daysAgo: 14,
    monthsAtMost: 9,
    authorizedBrands: [] as VaccineBrand[],
    languages: ['en'] as string[],
    partial: false,
    ...RestrictionNode.defaultOptions,
  }

  matches(userValue: number): boolean {
    console.log(userValue)
    console.log(this.options)
    return !this.options.daysAgo || userValue >= this.options.daysAgo
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.VACCINATED
  }
}
