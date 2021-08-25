import { useCookies, useRootStore } from '@/shared/src/composables/use-plugins'
import { transformCountryCodeToOriginSlug } from '@/shared/src/modules/country-list/country-list-helpers'

export function getPersistedOriginOrDefault(): string {
  return useRootStore().getters.detectedCountryWithFallback
}

export function getCurrentOriginSlug(): string {
  return transformCountryCodeToOriginSlug(getPersistedOriginOrDefault())
}

export function getCookieCountry(): string | undefined {
  return useCookies().get('country')
}
