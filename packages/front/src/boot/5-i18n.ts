import { boot } from 'quasar/wrappers'
import VueI18n from 'vue-i18n'

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
import { reloadRoutes } from '@/front/src/router/helpers'
import { setI18n } from '@/shared/src/composables/use-plugins'
import { createVueI18n } from '@/shared/src/misc/i18n'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n
  }
}

export const i18n = createVueI18n(serverCache.i18nMessages)

export default boot(async ({ app, store, ssrContext, redirect, router }) => {
  console.log('Language is not rememberred')
  const isClient = !ssrContext
  app.i18n = i18n
  setI18n(i18n)

  if (isClient) {
    preloadLocaleMessageCollectionIntoPlugin(i18n, store.state.locales)
  }

  const currentLocale = extractCurrentLocale(store, ssrContext)

  setLocale(currentLocale)

  if (ssrContext) {
    store.commit('setServerLocale', currentLocale)
    reloadRoutes()

    let url
    if ((url = localeChangeHandler(currentLocale, router, ssrContext))) {
      redirect(url)
    }

    try {
      await autoTranslateIfNecessary(currentLocale)
    } catch (error) {
      console.log(error)
      redirect('/en/from/united-states-of-america')
      return
    }

    pushRequiredLocalesToStore(i18n, currentLocale, store)
  }
})
