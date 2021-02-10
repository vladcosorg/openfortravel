import countryList from 'countries-list/dist/countries.json'
import { mapValues } from 'lodash-es'

import { transformKeys } from '@/shared/src/misc/misc'

export function loadContinentMap(): Record<string, string> {
  return mapValues(
    transformKeys(countryList, (key) => key.toLowerCase()),
    (country) => country.continent.toLowerCase(),
  )
}
