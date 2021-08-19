import { convertRelativeToAbsoluteURL } from '@/front/src/router'
import {
  useRootStore,
  useRoute,
  useRouter,
} from '@/shared/src/composables/use-plugins'

type HreflangList = Record<
  string,
  { href: string; rel: string; hreflang: string }
>

export function generateHreflangTags(): HreflangList {
  const currentRoute = useRoute()
  const list: HreflangList = {}

  for (const locale of useRootStore().state.availableLocales) {
    const item = {
      href: convertRelativeToAbsoluteURL(
        useRouter().resolve({
          name: currentRoute.name,
          params: { ...currentRoute.params, locale },
        }).href,
      ),
      rel: 'alternate',
      hreflang: `${locale}`,
    }

    list[locale] = item

    if (locale === 'en') {
      list['default'] = { ...item, hreflang: 'x-default' }
    }
  }
  return list
}
