import kebabCase from 'lodash/kebabCase'

import { useStore } from 'src/composables/use-plugins'
import { useVuexRawGetter, useVuexRawState } from 'src/composables/use-vuex'

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

export function transformOriginSlugToCode(countrySlug: string): string {
  return useStore().getters['modules/countryList/originKebabList'][countrySlug]
}

export function transformDestinationSlugToCode(countrySlug: string): string {
  return useStore().getters['modules/countryList/destinationKebabList'][
    countrySlug
  ]
}

export function getCountryCodes(): string[] {
  return useVuexRawGetter('modules/countryList/countryCodes')
}

export function getLabelForCountryCode(countryCode: string): string {
  return useVuexRawState<CountryList>('modules.countryList.countryList')[
    countryCode
  ]
}

export function getOriginLabelForCountryCode(countryCode: string): string {
  return useVuexRawGetter<CountryList>('modules/countryList/originLabels')[
    countryCode
  ]
}

export function getDestinationLabelForCountryCode(countryCode: string): string {
  return useVuexRawGetter<CountryList>('modules/countryList/destinationLabels')[
    countryCode
  ]
}

export async function getMappedCountrySlugOrUndefined(
  fromSlug: string,
  toSlug: string,
  type: 'origin' | 'destination' = 'origin',
): Promise<string | undefined> {
  await useVuexRawState('modules.countryList.fetchingPromise')
  const mapCu = useStore().getters[`modules/countryList/${type}KebabList`]

  if (mapCu[toSlug]) {
    return
  }

  const map = useStore().getters[
    'modules/countryList/getPreviousToCurrentCountryList'
  ]
  return map[fromSlug]
}
