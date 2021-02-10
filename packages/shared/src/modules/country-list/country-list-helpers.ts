import { kebabCase } from 'lodash-es'

import { LanguageLocale } from '@/front/src/modules/i18n/types'
import { useStore } from '@/shared/src/composables/use-plugins'
import {
  useVuexRawGetter,
  useVuexRawState,
  useVuexRawStateProperty,
} from '@/shared/src/composables/use-vuex'
import { CountryListState } from '@/shared/src/modules/country-list/country-list-store'
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
  const originSlugToCodeMap = useVuexRawState<CountryListState>(
    'originSlugMap',
    'modules.countryList',
  )
  let countryCode = originSlugToCodeMap[originSlug]

  if (lookInMigration && !countryCode) {
    const migrationSlugMap = useVuexRawStateProperty<CountryList>(
      'modules.countryList.slugMigrationOriginMap',
    )

    countryCode = originSlugToCodeMap[migrationSlugMap[originSlug]]
  }

  return countryCode
}

export function transformCanonicalSlugToCode(countrySlug: string): string {
  const slugMap = useVuexRawStateProperty<CountryList>(
    'modules.countryList.canonicalSlugToCountryCodeMap',
  )
  return slugMap[countrySlug]
}

export function transformDestinationSlugToCode(
  countrySlug: DestinationSlug,
  lookInMigration = false,
): string {
  const destinationSlugToCodeMap = useVuexRawState<CountryListState>(
    'destinationSlugMap',
    'modules.countryList',
  )
  let countryCode = destinationSlugToCodeMap[countrySlug]

  if (lookInMigration && !countryCode) {
    const migrationSlugMap = useVuexRawStateProperty<CountryList>(
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
  return useVuexRawStateProperty<CountryList>(
    'modules.countryList.countryList',
  )[countryCode]
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

export function preloadCountryListForLocale(
  locale: LanguageLocale,
): Promise<void> {
  return useStore().dispatch('modules/countryList/fetchCountryList', locale)
}
