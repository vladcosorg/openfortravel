import { getCurrentOriginSlug } from '@/front/src/misc/country-decider'
import { generateContextSlug } from '@/front/src/store/getters'
import { getOrCreateSearchId } from '@/shared/src/api/searchIds/repository'
import {
  useI18n,
  useRootStore,
  useRouter,
} from '@/shared/src/composables/use-plugins'
import {
  transformCountryCodeToDestinationSlug,
  transformCountryCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

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
  slug,
}: {
  destinationCode: string
  locale?: string
  originCode?: string
  searchId?: string
  slug?: string
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
        searchId: searchId ?? useRootStore().state.searchId,
      },
    }).href + slug ?? useRootStore().getters.contextSlug
  )
}

export async function generateDestinationRoute({
  locale,
  originCode,
  destinationCode,
  contextOverrides,
}: {
  destinationCode: string
  locale?: string
  originCode?: string
  contextOverrides?: Partial<VisitorProfile>
}): Promise<string> {
  const searchId = await getOrCreateSearchId(
    Object.assign({}, useRootStore().state.visitorContext, contextOverrides),
  )
  return createDestinationRoute({
    destinationCode,
    searchId,
    locale,
    originCode,
    slug: generateContextSlug(
      Object.assign(
        {},
        useRootStore().getters.visitorContextWithDefaults,
        contextOverrides,
      ),
    ),
  })
}
