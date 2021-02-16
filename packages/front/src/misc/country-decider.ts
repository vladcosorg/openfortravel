import { useCookies, useStore } from '@/shared/src/composables/use-plugins'
import {
  getLabelForCountryCode,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

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
