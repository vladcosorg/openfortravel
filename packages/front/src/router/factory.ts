import { getCurrentOriginSlug } from '@/front/src/misc/country-decider'
import {
  useI18n,
  useRootStore,
  useRouter,
} from '@/shared/src/composables/use-plugins'
import {
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export function createOriginRoute({
  locale,
  originCode,
  searchId,
}: {
  locale?: string
  originCode?: string
  searchId?: string
} = {}): string {
  return (
    useRouter().resolve({
      name: 'origin',
      params: {
        locale: locale ?? useI18n().locale,
        originSlug: originCode
          ? transformCountryCodeToOriginSlug(originCode)
          : getCurrentOriginSlug(),
        searchId: searchId || useRootStore().state.searchId,
      },
    }).href + useRootStore().getters.contextSlug
  )
}

export function createDestinationRoute({
  locale,
  originCode,
  destinationCode,
  searchId,
}: {
  destinationCode: string
  locale?: string
  originCode?: string
  searchId?: string
}): string {
  return (
    useRouter().resolve({
      name: 'destination',
      params: {
        locale: locale ?? useI18n().locale,
        originSlug: originCode
          ? transformCountryCodeToOriginSlug(originCode)
          : getCurrentOriginSlug(),
        destinationSlug: transformCountryCodeToDestinationSlug(destinationCode),
        searchId: searchId || useRootStore().state.searchId,
      },
    }).href + useRootStore().getters.contextSlug
  )
}
