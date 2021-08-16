import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { AbstractRestrictionNode } from '@/shared/src/restriction-tree/abstract-restriction-node'
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

export const vaccineSelectList = transformFlatMapToArrayOfPairs(vaccineLabels)

export function getVaccineLabel(id?: VaccineBrand): string {
  return id ? vaccineLabels[id] : 'not vaccinated'
}

export function isVaccineBrand(brand: string): brand is VaccineBrand {
  return Object.values(VaccineBrand).includes(brand as VaccineBrand)
}

type DefaultOptions = typeof Vaccinated.defaultOptions
export class Vaccinated extends AbstractRestrictionNode<DefaultOptions> {
  static defaultOptions = {
    daysAgo: 14,
    monthsAtMost: 9,
    authorizedBrands: [] as VaccineBrand[],
    languages: [] as string[],
    issuer: [] as string[],
    partial: false,
    ...AbstractRestrictionNode.defaultOptions,
  }

  matches(visitorContext?: { brand: VaccineBrand; partial: boolean }): boolean {
    if (!visitorContext || this.options.partial !== visitorContext.partial) {
      return false
    }

    if (this.options.authorizedBrands.length === 0) {
      return true
    }

    return this.options.authorizedBrands.includes(visitorContext.brand)
  }

  id(): RestrictionNodeType {
    return RestrictionNodeType.VACCINATED
  }
}
