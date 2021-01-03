import { useI18n, useStore } from '@/shared/src/composables/use-plugins'
import { useVuexRawState } from '@/shared/src/composables/use-vuex'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { Nationalities } from '@/shared/src/modules/nationality/nationality-store'

export function preloadLocalizedNationalities(locale: string): Promise<void> {
  return useStore().dispatch('modules/nationalities/fetch', locale)
}

export function getNationalityOrFallback(countryCode: string): string {
  const list = useVuexRawState<Nationalities>('modules.nationalities.list')

  return useI18n().t('misc.countryCitizen', {
    country: list[countryCode] ?? getLabelForCountryCode(countryCode),
  }) as string
}
