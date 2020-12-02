import kebabCase from 'lodash/kebabCase'

import { useStore } from 'src/composables/use-plugins'
import { useRawVuexGetter, useVuexRawState } from 'src/composables/use-vuex'

export type CountryList = Record<string, string>

export function transformCodeToSlug(
  countryCode: string,
  label?: string,
): string {
  return kebabCase(label ?? getLabelForCountryCode(countryCode))
}
export function transformSlugToCode(countrySlug: string): string {
  return useStore().getters['modules/countryList/getCountryKebabList'][
    countrySlug
  ]
}

export function getCountryCodes(): string[] {
  return useRawVuexGetter('modules/countryList/getCountryCodes')
}

export function getLabelForCountryCode(countryCode: string): string {
  return useRawVuexGetter<(code: string) => string>(
    'modules/countryList/getLabelByCountryCode',
  )(countryCode)
}

export async function getMappedCountrySlugOrUndefined(
  fromSlug: string,
  toSlug: string,
): Promise<string | undefined> {
  await useVuexRawState('modules.countryList.fetchingPromise')
  const mapCu = useStore().getters['modules/countryList/getCountryKebabList']

  if (mapCu[toSlug]) {
    return
  }

  const map = useStore().getters[
    'modules/countryList/getPreviousToCurrentCountryList'
  ]
  return map[fromSlug]
}
