import type { QSsrContext } from '@quasar/app'
import type { LooseDictionary } from 'quasar'
import { Cookies } from 'quasar'

import { useVueI18n } from '@/shared/src/composables/use-plugins'

export const getCookiesAPI = function (
  ssrContext?: QSsrContext | null,
): Cookies {
  return process.env.SERVER
    ? Cookies.parseSSR(ssrContext as LooseDictionary)
    : Cookies // otherwise we're on client
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function importAll<T>(context: any): T {
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return context.keys().map(context)
}

export function generateStringSequenceFromList(
  list: string[],
  wrapperTag?: string,
): string {
  const { t } = useVueI18n<string>()
  if (wrapperTag) {
    list = list.map((listItem) => `<${wrapperTag}>${listItem}</${wrapperTag}>`)
  }

  if (list.length === 1) {
    return list.shift() as string
  } else if (list.length > 1) {
    const lastItem = list.pop()
    return `${list.join(', ')} ${t('misc.or')} ${lastItem}`
  }

  return ''
}
