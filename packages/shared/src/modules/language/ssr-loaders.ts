import { importAll } from '@/front/src/misc/misc'

type ExternalData = { locale: string; languages: Record<string, string> }
export type PrefetchedLocalizedLanguages = Record<
  string,
  Record<string, string>
>

export function loadLanguages(): PrefetchedLocalizedLanguages {
  const context = (require as any).context(
    '@cospired/i18n-iso-languages/langs',
    true,
    /\.json$/,
  )
  return importAll<Array<ExternalData>>(
    context,
  ).reduce<PrefetchedLocalizedLanguages>((acc, language) => {
    acc[language.locale] = language.languages
    return acc
  }, {})
}
