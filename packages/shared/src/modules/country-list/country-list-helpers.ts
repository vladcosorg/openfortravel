import kebabCase from 'lodash/kebabCase'

import { useStore } from '@/shared/src/composables/use-plugins'
import {
  useVuexRawGetter,
  useVuexRawState,
} from '@/shared/src/composables/use-vuex'
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

export function transformOriginSlugToCode(
  originSlug: OriginSlug,
  lookInMigration = false,
): string {
  const originSlugToCodeMap = useStore().getters[
    'modules/countryList/originKebabList'
  ]
  let countryCode = originSlugToCodeMap[originSlug]

  if (lookInMigration && !countryCode) {
    const migrationSlugMap = useVuexRawState<CountryList>(
      'modules.countryList.slugMigrationOriginMap',
    )

    countryCode = originSlugToCodeMap[migrationSlugMap[originSlug]]
  }

  return countryCode
}

export function transformCanonicalSlugToCode(countrySlug: string): string {
  const slugMap = useVuexRawState<CountryList>(
    'modules.countryList.canonicalSlugToCountryCodeMap',
  )
  return slugMap[countrySlug]
}

export function transformDestinationSlugToCode(
  countrySlug: DestinationSlug,
  lookInMigration = false,
): string {
  const destinationSlugToCodeMap = useStore().getters[
    'modules/countryList/destinationKebabList'
  ]
  let countryCode = destinationSlugToCodeMap[countrySlug]

  if (lookInMigration && !countryCode) {
    const migrationSlugMap = useVuexRawState<CountryList>(
      'modules.countryList.slugMigrationDestinationMap',
    )

    countryCode = destinationSlugToCodeMap[migrationSlugMap[countrySlug]]
  }

  return countryCode
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

export function preloadLocalizedListLanguage(locale: string): Promise<void> {
  return useStore().dispatch('modules/countryList/fetchCountryList', locale)
}
