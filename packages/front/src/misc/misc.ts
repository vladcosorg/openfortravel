import { QSsrContext } from '@quasar/app'
import { Cookies, LooseDictionary } from 'quasar'

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
