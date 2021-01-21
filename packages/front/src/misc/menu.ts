import { IVueI18n, TranslateResult } from 'vue-i18n'
import { Location } from 'vue-router'

import { getCurrentOriginSlug } from '@/front/src/misc/country-decider'
import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'

type MenuItemRawPair = {
  url: (locale: string) => Location
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
  origin: {
    url: (locale) => ({
      name: 'origin',
      params: { locale, originSlug: getCurrentOriginSlug() },
    }),
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
  return {
    url: useRouter().resolve(item.url(useI18n().locale)).href,
    title: item.title(useI18n()) as string,
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
  return getMenuItems('index', 'origin', 'terms', 'privacy', 'contact')
}

export function getDrawerMenuItems(): MenuItemMapCollection {
  return getMenuItems('index', 'origin', 'terms', 'privacy', 'contact')
}

export function getFooterMenuItems(): MenuItemMapCollection {
  return getMenuItems('index', 'origin', 'terms', 'privacy', 'contact')
}
