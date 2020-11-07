import { TranslateResult } from 'vue-i18n'

import {
  PlainRestriction,
  Restriction,
  restrictionDefaults,
  RestrictionStatus,
} from 'src/api/restrictions/models'
import {
  findRestrictionsByDestination,
  findRestrictionsByOrigin,
} from 'src/api/restrictions/repository'
import { i18n } from 'src/boot/i18n'
import { getCountryCodes as getAllCountryCodes } from 'src/misc/country-list'

export async function generateRestrictionListByDestination(
  destinationCode: string,
): Promise<PlainRestriction[]> {
  const realRestrictions = await findRestrictionsByDestination(destinationCode)
  const fallbackRestrictions = generateFallbackRestrictions(
    realRestrictions,
    destinationCode,
    'destination',
    'origin',
  )
  return realRestrictions.concat(fallbackRestrictions)
}

export async function generateRestrictionListByOrigin(
  originCode: string,
): Promise<PlainRestriction[]> {
  const realRestrictions = await findRestrictionsByOrigin(originCode)
  const fallbackRestrictions = generateFallbackRestrictions(
    realRestrictions,
    originCode,
    'origin',
    'destination',
  )
  return realRestrictions.concat(fallbackRestrictions)
}

function generateFallbackRestrictions(
  realRestrictions: PlainRestriction[],
  keyField: string,
  valueField: keyof PlainRestriction = 'origin',
  fallbackField: keyof PlainRestriction = 'destination',
): PlainRestriction[] {
  const realCountryCodes = new Set(
    realRestrictions.map((restriction) => restriction[fallbackField]),
  )
  const fallbackRestrictions: PlainRestriction[] = []

  for (const countryCode of getAllCountryCodes()) {
    if (realCountryCodes.has(countryCode) || keyField === countryCode) {
      continue
    }

    fallbackRestrictions.push(
      createDummyPlainRestriction({
        [valueField]: keyField,
        [fallbackField]: countryCode,
      }),
    )
  }
  return fallbackRestrictions
}

export function sortByOrigin(collection: Restriction[]): Restriction[] {
  return collection.sort((a, b) => a.originLabel.localeCompare(b.originLabel))
}

export function sortByDestination(collection: Restriction[]): Restriction[] {
  return collection.sort((a, b) => a.destinationLabel.localeCompare(b.destinationLabel))
}

export function wrapWithRichRestrictionObject(plainRestriction: PlainRestriction): Restriction {
  return new Restriction(plainRestriction)
}

export function wrapCollectionWithRichObject(plainRestrictions: PlainRestriction[]): Restriction[] {
  return plainRestrictions.map((element) => wrapWithRichRestrictionObject(element))
}

export function getStatusListPairs(): {
  label: TranslateResult
  value: RestrictionStatus
}[] {
  return Object.values(RestrictionStatus).map((value) => ({
    label: i18n.t(`status.${value}`),
    value,
  }))
}

export function createDummyPlainRestriction(
  mergeFields: Partial<PlainRestriction> = {},
): PlainRestriction {
  return Object.assign({}, restrictionDefaults, mergeFields)
}
