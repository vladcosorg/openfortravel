import allLocales from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'
import { intersection } from 'lodash'
import autoLanguages from 'vue-auto-i18n/supported-languages/google.json'

export type Locale = string
export type LocaleList = Locale[]

let validLocales: string[]
export function getTranslatedOrTranslatableLocales(): LocaleList {
  if (validLocales) {
    return validLocales
  }
  return (validLocales = intersection(
    allLocales.map((localePair) => localePair.value),
    autoLanguages,
  ))
}
