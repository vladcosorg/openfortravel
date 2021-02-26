import zipObject from 'lodash/zipObject'
import { TranslateResult } from 'vue-i18n'

import {
  MappedPlainRestrictionCollection,
  MappedRestrictionCollection,
  PlainRestriction,
  PlainRestrictionCollection,
  Restriction,
  RestrictionCollection,
  restrictionDefaults,
  RestrictionStatus,
} from '@/shared/src/api/restrictions/models'
import {
  findRestrictionsByDestination,
  findRestrictionsByOrigin,
} from '@/shared/src/api/restrictions/repository'
import { useI18n } from '@/shared/src/composables/use-plugins'
import {
  transformArrayCollectionToMappedCollection,
  wrapCollection,
} from '@/shared/src/misc/misc'
import { getOrderedListOfContinentIDs } from '@/shared/src/modules/continent-map/continent-map-helpers'
import { getCountryCodes as getAllCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'

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
  return [...realRestrictions, ...fallbackRestrictions]
}

export function fillMissingRestrictionsWithFallbacks<
  T extends MappedPlainRestrictionCollection | PlainRestrictionCollection
>(
  existingRestrictions: T,
  countryCode: string,
  type: 'origin' | 'destination',
): T {
  const fallbacks = generateFallbackRestrictions(
    Array.isArray(existingRestrictions)
      ? existingRestrictions
      : Object.values(existingRestrictions),
    countryCode,
    type === 'origin' ? 'origin' : 'destination',
    type === 'origin' ? 'destination' : 'origin',
  )

  if (!Array.isArray(existingRestrictions)) {
    return Object.assign(
      {},
      existingRestrictions,
      transformArrayCollectionToMappedCollection(
        fallbacks,
        type === 'origin' ? 'destination' : 'origin',
      ),
    ) as T
  }

  return [...existingRestrictions] as T
}

export async function generateRestrictionListByOrigin(
  originCode: string,
  useOnlyFallbacks: boolean,
): Promise<PlainRestriction[]> {
  const realRestrictions: PlainRestriction[] = useOnlyFallbacks
    ? []
    : await findRestrictionsByOrigin(originCode)
  const fallbackRestrictions = generateFallbackRestrictions(
    realRestrictions,
    originCode,
    'origin',
    'destination',
  )
  return [...realRestrictions, ...fallbackRestrictions]
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
  const continentIDs = getOrderedListOfContinentIDs()
  return collection.sort(
    (a, b) =>
      // a.destinationLabel.localeCompare(b.destinationLabel),
      continentIDs.indexOf(a.originContinent!) -
      continentIDs.indexOf(b.originContinent!),
  )
}

export function wrapWithRichRestrictionObject(
  plainRestriction: PlainRestriction,
): Restriction {
  return new Restriction(plainRestriction)
}

export function wrapCollectionWithRichObject(
  plainRestrictions: MappedPlainRestrictionCollection,
): MappedRestrictionCollection
export function wrapCollectionWithRichObject(
  plainRestrictions: PlainRestrictionCollection,
): RestrictionCollection
export function wrapCollectionWithRichObject(
  plainRestrictions:
    | PlainRestrictionCollection
    | MappedPlainRestrictionCollection,
): RestrictionCollection | MappedRestrictionCollection {
  return wrapCollection(
    plainRestrictions as PlainRestrictionCollection,
    (restriction) => wrapWithRichRestrictionObject(restriction),
  )
}

function getStatusList(): Array<RestrictionStatus> {
  return Object.values(RestrictionStatus)
}

export function getStatusMapper<T>(
  mapper: (status: RestrictionStatus) => T,
): Record<RestrictionStatus, T> {
  const keys = Object.values(RestrictionStatus)
  return zipObject(
    keys,
    keys.map((status) => mapper(status)),
  ) as Record<RestrictionStatus, T>
}

export function getStatusListMap(): Record<RestrictionStatus, TranslateResult> {
  const keys = getStatusList()
  return zipObject(
    keys,
    keys.map((status) => useI18n().t(`status.${status}`)),
  ) as Record<RestrictionStatus, TranslateResult>
}

export function getStatusListPairs(): {
  label: TranslateResult
  value: RestrictionStatus
}[] {
  return Object.values(RestrictionStatus).map((value) => ({
    label: useI18n().t(`status.${value}`),
    value,
  }))
}

export function createDummyPlainRestriction(
  mergeFields: Partial<PlainRestriction> = {},
): PlainRestriction {
  return Object.assign({}, restrictionDefaults, mergeFields)
}
