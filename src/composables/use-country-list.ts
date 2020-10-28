import { onServerPrefetch, toRef, watch } from '@vue/composition-api'

import { i18n } from 'src/boot/i18n'
import { loadCountryList } from 'src/misc/country-list'

export function useCountryListLoader(): void {
  onServerPrefetch(() => loadCountryList(i18n.locale))
  watch(toRef(i18n, 'locale'), loadCountryList)
}
