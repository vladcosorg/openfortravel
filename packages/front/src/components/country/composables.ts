import { PropType } from 'vue'

import {
  getDestinationLabelForCountryCode,
  getLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'

type Declination = 'origin' | 'destination' | 'nominative'
export const withProps = {
  declination: {
    type: String as PropType<Declination>,
    default: 'origin' as Declination,
  },
  prefix: {
    type: String,
    required: false,
  },
  regular: {
    type: Boolean,
    default: false,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  skipMapping: {
    type: Boolean,
    default: false,
  },
}

export function getLabelByDeclination(
  countryISO: string,
  declination: Declination,
): string {
  switch (declination) {
    case 'origin': {
      return getOriginLabelForCountryCode(countryISO)
    }
    case 'destination': {
      return getDestinationLabelForCountryCode(countryISO)
    }
    case 'nominative': {
      return getLabelForCountryCode(countryISO)
    }
    // No default
  }

  throw new Error('Undefined type')
}
