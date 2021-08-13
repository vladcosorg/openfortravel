import { useCookies, useSSRContext } from '@/shared/src/composables/use-plugins'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'

export function setLocaleCookie(locale: string): void {
  useCookies().set('locale', locale, {
    path: '/',
  })
}

export function getLocaleCookie(): string {
  return useCookies().get('locale')
}

export function inferLocaleFromClient(): string {
  let locale: string = getLocaleCookie()

  if (locale) {
    return locale
  }

  const ssrContext = useSSRContext()
  locale = ssrContext
    ? ssrContext.req.acceptsLanguages()[0].toLowerCase().split('-')[0]
    : navigator.language.toLowerCase().split('-')[0]

  // some browser locales may not exist in our language list
  if (!langs.map((pair) => pair.value).includes(locale)) {
    locale = 'en'
  }

  setLocaleCookie(locale)

  return locale
}
