import { Route } from 'vue-router'

import { fetchCurrentCountryCode } from '@/shared/src/api/ip-api'
import { useCookies, useStore } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCodeToOriginSlug,
  transformOriginSlugToCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

export async function decideOnCountry(
  route: Route,
  skipRemote: boolean,
): Promise<string> {
  const countryCodeSources: (() => string | Promise<string>)[] = [
    () => transformOriginSlugToCode(route.params.originSlug),
    () => useCookies().get('country'),
  ]

  if (!skipRemote) {
    countryCodeSources.push(fetchCurrentCountryCode)
  }

  for (const countryCodeSource of countryCodeSources) {
    const result = await countryCodeSource()
    if (result) {
      return result
    }
  }

  return 'us'
}

export function getCurrentCountryCode(): string {
  return useStore().state['detectedCountry']
}

export function getCurrentCountryLabel(): string {
  return getLabelForCountryCode(getCurrentCountryCode())
}

export function getCurrentOriginSlug(): string {
  return transformCodeToOriginSlug(getCurrentCountryCode())
}

export function setCurrentCountry(
  countryCode: string,
  saveToCookie: boolean,
): void {
  if (getCurrentCountryCode() === countryCode) {
    return
  }

  useStore().commit('setDetectedCountry', countryCode)
  if (saveToCookie) {
    useCookies().set('country', countryCode, {
      path: '/',
    })
  }
}
