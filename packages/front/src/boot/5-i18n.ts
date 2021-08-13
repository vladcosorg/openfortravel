import { setI18n } from '@/shared/src/composables/use-plugins'
import { createVueI18n } from '@/shared/src/misc/i18n'
import { boot } from 'quasar/wrappers'
import type { VueI18n } from 'vue-i18n'

import { serverCache } from '@/front/src/misc/server-cache'
import {
  autoTranslateIfNecessary,
  extractCurrentLocale,
  localeChangeHandler,
  setLocale,
} from '@/front/src/modules/i18n/boot'
import {
  preloadLocaleMessageCollectionIntoPlugin,
  pushRequiredLocalesToStore,
} from '@/front/src/modules/i18n/loaders'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}

export const i18nPlugin = createVueI18n(serverCache.i18nMessages)

export default boot(async ({ app, store, ssrContext, redirect, router }) => {
  app.use(i18nPlugin)
  const i18n = i18nPlugin.global

  const isClient = !ssrContext

  app.i18n = i18n

  setI18n(i18n)

  // return
  if (isClient) {
    preloadLocaleMessageCollectionIntoPlugin(i18n, store.state.locales)
  }

  const currentLocale = extractCurrentLocale(store, ssrContext)
  setLocale(currentLocale)

  if (ssrContext) {
    store.commit('setServerLocale', currentLocale)

    let url
    if ((url = localeChangeHandler(currentLocale, router, ssrContext))) {
      redirect(url)
    }
    try {
      await autoTranslateIfNecessary(currentLocale, i18n)
    } catch {
      redirect('/en/from/united-states-of-america')
      return
    }
    pushRequiredLocalesToStore(i18n, currentLocale, store)
  }
})
