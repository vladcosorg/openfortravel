import { kebabCase } from 'lodash-es'

import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'
import {
  DestinationSlug,
  OriginSlug,
} from '@/shared/src/modules/country-list/country-list-types'

export type CountryList = Record<string, string>

export function transformCodeToOriginSlug(
  countryCode: string,
  label?: string,
): string {
  return kebabCase(label ?? getOriginLabelForCountryCode(countryCode))
}

export function transformCodeToDestinationSlug(
  countryCode: string,
  label?: string,
): string {
  return kebabCase(label ?? getDestinationLabelForCountryCode(countryCode))
}

export function transformOriginSlugToCode(originSlug: OriginSlug): string {
  const originSlugToCodeMap = useVuexRawGetter<CountryList>(
    'modules/countryList/originSlugMap',
  )

  return originSlugToCodeMap[originSlug]
}

export function transformDestinationSlugToCode(
  countrySlug: DestinationSlug,
): string {
  const destinationSlugToCodeMap = useVuexRawGetter<CountryList>(
    'modules/countryList/originSlugMap',
  )
  return destinationSlugToCodeMap[countrySlug]
}

export function getCountryCodes(): string[] {
  return useVuexRawGetter('modules/countryList/countryCodes')
}

export function getLabelForCountryCode(countryCode: string): string {
  return getOriginLabelForCountryCode(countryCode)
}

export function getOriginLabels(): CountryList {
  return useVuexRawGetter<CountryList>('modules/countryList/countryListOrigin')
}

export function getDestinationLabels(): CountryList {
  return useVuexRawGetter<CountryList>(
    'modules/countryList/countryListDestination',
  )
}
export function getOriginLabelForCountryCode(countryCode: string): string {
  return getOriginLabels()[countryCode]
}

export function getDestinationLabelForCountryCode(countryCode: string): string {
  return getDestinationLabels()[countryCode]
}
