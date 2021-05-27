import { useCookies, useRootStore } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function getPersistedOriginOrDefault(): string {
  return useRootStore().getters.detectedCountryWithFallback
}

export function getCurrentCountryLabel(): string {
  return getLabelForCountryCode(getPersistedOriginOrDefault())
}

export function getCurrentOriginSlug(): string {
  return transformCountryCodeToOriginSlug(getPersistedOriginOrDefault())
}

export function getCookieCountry(): string | undefined {
  return useCookies().get('country')
}

export function setCurrentCountry(
  countryCode: string,
  saveToCookie: boolean,
): void {
  if (getPersistedOriginOrDefault() === countryCode) {
    return
  }

  useRootStore().mutations.setVisitorOrigin(countryCode)
  if (saveToCookie) {
    useCookies().set('country', countryCode, {
      path: '/',
    })
  }
}
