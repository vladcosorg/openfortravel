import { Locale } from 'vue-i18n'

import { importAll } from '@/front/src/misc/misc'
import { normalizeFormat } from '@/shared/src/modules/nationality/nationality-helpers'
import { Nationalities } from '@/shared/src/modules/nationality/nationality-store'

export type PreloadedNationalityList = Record<Locale, Nationalities>
export function preloadNationalities(): PreloadedNationalityList {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = (require as any).context(
    'i18n-nationality/langs/',
    true,
    /\.json$/,
  )
  const content = importAll<
    Array<{
      locale: string
      nationalities: Record<string, string>
    }>
  >(context)
  const output: PreloadedNationalityList = {}

  for (const group of content) {
    output[group.locale] = normalizeFormat(group.nationalities)
  }

  return output
}
