import { useRouter, RouteLocationRaw } from 'vue-router'

import { getCurrentOriginSlug } from '@/front/src/misc/country-decider'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'
import { useVueI18n } from '@/shared/src/composables/use-plugins'

import type { IVueI18n, TranslateResult } from 'vue-i18n'

type MenuItemRawPair = {
  url: (locale: string) => RouteLocationRaw
  title: (i18n: IVueI18n) => TranslateResult
}
type MenuItemPair = { url: string; title: string }
type MenuItemMapCollection = Record<string, string>

const links: Record<string, MenuItemRawPair> = {
  index: {
    url: (locale) => ({
      name: 'index-targeted',
      params: { locale, originSlug: getCurrentOriginSlug() },
    }),
    title: (i18n) => i18n.t('page.index.link'),
  },
  wizard: {
    url: () => ({
      name: 'guide',
    }),
    title: () => 'Travel wizard',
  },
  origin: {
    url: (locale) => getOriginRouteURL({ locale }),
    title: (i18n) => i18n.t('page.country.link'),
  },
  terms: {
    url: (locale) => ({
      name: 'terms',
      params: { locale },
    }),
    title: (i18n) => i18n.t('page.terms.link'),
  },
  privacy: {
    url: (locale) => ({
      name: 'privacy',
      params: { locale },
    }),
    title: (i18n) => i18n.t('page.privacy.link'),
  },
  contact: {
    url: (locale) => ({
      name: 'contact',
      params: { locale },
    }),
    title: (i18n) => i18n.t('page.contact.link'),
  },
}

export function getMenuItemPair(menuID: keyof typeof links): MenuItemPair {
  const item = links[menuID]
  const { i18n } = useVueI18n()
  return {
    url: useRouter().resolve(item.url(i18n.locale.value)).href,
    title: item.title(i18n),
  }
}

export function getMenuItemURL(menuID: keyof typeof links): string {
  return getMenuItemPair(menuID).url
}

export function getMenuItems(
  ...menuIDs: Array<keyof typeof links>
): MenuItemMapCollection {
  return Object.fromEntries(
    menuIDs.map((menuID) => Object.values(getMenuItemPair(menuID))),
  )
}

export function getShortHeaderMenuItems(): MenuItemMapCollection {
  return getMenuItems(
    'index',
    'wizard',
    'origin',
    'terms',
    'privacy',
    'contact',
  )
}

export function getDrawerMenuItems(): MenuItemMapCollection {
  return getMenuItems('index', 'origin', 'terms', 'privacy', 'contact')
}

export function getFooterMenuItems(): MenuItemMapCollection {
  return getMenuItems('index', 'origin', 'terms', 'privacy', 'contact')
}
