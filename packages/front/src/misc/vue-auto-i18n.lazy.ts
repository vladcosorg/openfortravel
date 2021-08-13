import { useI18n } from '@/shared/src/composables/use-plugins'
import type { ManualTranslator, TranslationService } from 'vue-auto-i18n'
import { integrateWithVueI18n } from 'vue-auto-i18n'
import type { Locale, LocaleMessageObject } from 'vue-i18n'

export function createAutoI18n(
  i18nPluginInstance: ReturnType<typeof useI18n>,
): ManualTranslator {
  return integrateWithVueI18n({
    i18nPluginInstance,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sourceLanguage: 'en',
    automatic: false,
    translationService: new ProxyTranslator(),
    blacklistedPaths: [
      'page.country.route',
      'page.destination.route',
      'page.index.route',
    ],
  })
}

class ProxyTranslator implements TranslationService {
  async translate(targetLanguage: Locale): Promise<LocaleMessageObject> {
    const params = new URLSearchParams({
      targetLanguage,
    })
    const response = await fetch(
      `https://us-central1-openfortravel.cloudfunctions.net/translate?${params.toString()}`,
    )
    return await response.json()
  }
}
