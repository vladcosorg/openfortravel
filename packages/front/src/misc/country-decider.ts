import { Cookies } from 'quasar'
import { Route } from 'vue-router'

import { fetchCurrentCountryCode } from '@/shared/src/api/ip-api'
import { useCookies, useStore } from '@/shared/src/composables/use-plugins'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'

export async function decideOnCountry(
  route: Route,
  cookies: Cookies,
): Promise<string> {
  const countryCodeSources: (() => string | Promise<string>)[] = [
    () => transformOriginSlugToCode(route.params.originSlug),
    () => cookies.get('country'),
    fetchCurrentCountryCode,
  ]

  for (const countryCodeSource of countryCodeSources) {
    const result = await countryCodeSource()
    if (result) {
      return result
    }
  }

  return 'us'
}

export function getCurrentCountry(): string {
  return useStore().state['detectedCountry']
}

export function persistCountry(countryCode: string): void {
  if (getCurrentCountry() === countryCode) {
    return
  }

  useStore().commit('setDetectedCountry', countryCode)
  useCookies().set('country', countryCode, {
    path: '/',
  })
}
