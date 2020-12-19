import { Cookies } from 'quasar'

import { cookies, storeInstance } from '@/front/src/boot/store'
import { fetchCurrentCountryCode } from '@/shared/src/api/ip-api'
import { transformOriginSlugToCode } from '@/shared/src/modules/country-list/country-list-helpers'
import { Route } from 'vue-router'

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
  return storeInstance.state.detectedCountry
}

export function persistCountry(countryCode: string): void {
  if (getCurrentCountry() === countryCode) {
    return
  }

  storeInstance.commit('setDetectedCountry', countryCode)
  cookies.set('country', countryCode, {
    path: '/',
  })
}
