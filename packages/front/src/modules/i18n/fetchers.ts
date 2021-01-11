import { LocaleMessageObject, LocaleMessages } from 'vue-i18n'

import { LanguageLocale } from '@/front/src/modules/i18n/types'

export async function fetchMessagesForLocale(
  lang: LanguageLocale,
): Promise<LocaleMessageObject> {
  // eslint-disable-next-line import/dynamic-import-chunkname
  const response: { default: LocaleMessageObject } = await import(
    /* webpackChunkName: "lang-[request]" */ `@/shared/src/i18n/${lang}.ts`
  )
  return response.default
}

export async function fetchAllLocaleMessages(): Promise<LocaleMessages> {
  const { default: messages } = await import(
    /* webpackChunkName: "all-i18n" */ '@/shared/src/i18n'
  )
  return (messages as unknown) as LocaleMessages
}
