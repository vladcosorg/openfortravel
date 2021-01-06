import Vue from 'vue'
import VueI18n, {
  IVueI18n,
  Locale,
  LocaleMessageObject,
  LocaleMessages,
} from 'vue-i18n'

import { useEventBus } from '@/shared/src/composables/use-plugins'
import { extendWithAutoI18n, TranslationService } from 'vue-auto-i18n'

export function createVueI18n(messages?: LocaleMessages): IVueI18n {
  Vue.use(VueI18n)
  return (new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  }) as unknown) as IVueI18n
}

export function createAutoI18n(i18n: IVueI18n) {
  return extendWithAutoI18n({
    i18nPluginInstance: i18n,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // apiKey: process.env.TRANSLATION_API_KEY!,
    sourceLanguage: 'en',
    apiProxyURL: `${process.env.PROJECT_URL}/translate`,
    automatic: true,
    translationService: process.env.CLIENT ? new SSRProxy() : undefined,
    blacklistedPaths: [
      'page.country.route',
      'page.destination.route',
      'page.index.route',
    ],
    onReady() {
      useEventBus().$emit('translation-ready')
    },
  })
}

class SSRProxy implements TranslationService {
  async translate(targetLanguage: Locale): Promise<LocaleMessageObject> {
    const response = await fetch(`${process.env.PROJECT_URL}/translate`, {
      body: new URLSearchParams({
        targetLanguage,
      }),
    })
    return await response.json()
  }
}
