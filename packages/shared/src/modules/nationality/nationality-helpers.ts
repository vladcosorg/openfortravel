import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { useVuexRawStateProperty } from '@/shared/src/composables/use-vuex'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { Nationalities } from '@/shared/src/modules/nationality/nationality-store'

export function getNationalityOrFallback(countryCode: string): string {
  const list = useVuexRawStateProperty<Nationalities>('modules.nationalities.list')

  return useI18n().t('misc.countryCitizen', {
    country: list[countryCode] ?? getLabelForCountryCode(countryCode),
  }) as string
}

export function getCurrentNationality(): string {
  return getNationalityOrFallback(getPersistedOriginOrDefault())
}

export function normalizeFormat(nationalities: Nationalities): Nationalities {
  return Object.fromEntries(
    Object.entries(nationalities).map(([countryCode, nationality]) => [
      countryCode.toLowerCase(),
      nationality,
    ]),
  )
}
