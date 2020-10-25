import { QSsrContext } from '@quasar/app'
import { Cookies, LooseDictionary } from 'quasar'

export const getCookiesAPI = function (
  ssrContext?: QSsrContext | null,
): Cookies {
  return process.env.SERVER
    ? Cookies.parseSSR(ssrContext as LooseDictionary)
    : Cookies // otherwise we're on client
}
