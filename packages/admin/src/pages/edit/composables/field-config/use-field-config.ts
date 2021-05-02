import type { Ref, SetupContext } from '@vue/composition-api'

import {
  createButtonToggle,
  createCountryList,
  createLanguageList,
  createTextInput,
  createVaccineList,
} from '@/admin/src/pages/edit/composables/field-config/fields'
import type {
  ExtractOptions,
  FieldConfig,
} from '@/admin/src/pages/edit/composables/field-config/helpers'
import { getSetters } from '@/admin/src/pages/edit/composables/field-config/helpers'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export function createConfig(
  type: RestrictionNodeType,
  options: Ref<ExtractOptions<RestrictionNodeType>>,
  emit: SetupContext['emit'],
): FieldConfig[] {
  switch (type) {
    case RestrictionNodeType.AGE: {
      const setters = getSetters(type, options, emit)
      return [
        createButtonToggle(setters.orMore, {
          options: [
            { label: 'Up to', value: false },
            { label: 'From', value: true },
          ],
        }),
        createTextInput(setters.age, { label: 'Limit', type: 'number' }),
      ]
    }

    case RestrictionNodeType.PCR_TEST: {
      const setters = getSetters(type, options, emit)

      return [
        createTextInput(setters.hours, { label: 'Limit', type: 'number' }),
        createLanguageList(setters.languages),
      ]
    }

    case RestrictionNodeType.ORIGIN: {
      const setters = getSetters(type, options, emit)

      return [
        createCountryList({
          countries: setters.allowedOrigins,
          not: setters.not,
        }),
      ]
    }

    case RestrictionNodeType.CITIZENSHIP: {
      const setters = getSetters(type, options, emit)

      return [
        createCountryList({
          countries: setters.allowedCitizenship,
          not: setters.not,
        }),
      ]
    }

    case RestrictionNodeType.DID_NOT_VISIT_COUNTRIES: {
      const setters = getSetters(type, options, emit)

      return [
        createCountryList({
          countries: setters.countryCodes,
          not: setters.inverseSelection,
        }),
        createTextInput(setters.days, { label: 'Days', type: 'number' }),
      ]
    }

    case RestrictionNodeType.QUARANTINE: {
      const setters = getSetters(type, options, emit)

      return [
        createTextInput(setters.days, { label: 'Days', type: 'number' }),
        createTextInput(setters.earlyReleaseDays, {
          label: 'Early',
          type: 'number',
        }),
      ]
    }

    case RestrictionNodeType.VACCINATED: {
      const setters = getSetters(type, options, emit)

      return [
        createTextInput(setters.daysAgo, { label: 'Days ago', type: 'number' }),
        createVaccineList(setters.authorizedBrands),
        createLanguageList(setters.languages),
      ]
    }

    case RestrictionNodeType.RECOVERY: {
      const setters = getSetters(type, options, emit)

      return [
        createTextInput(setters.daysAtLeast, {
          label: 'Days at least',
          type: 'number',
        }),
        createTextInput(setters.daysAtMost, {
          label: 'Days at most',
          type: 'number',
        }),
        createLanguageList(setters.languages),
      ]
    }

    case RestrictionNodeType.ONLINE_APPLICATION: {
      const setters = getSetters(type, options, emit)

      return [
        createTextInput(setters.url, {
          label: 'URL',
          type: 'url',
        }),
      ]
    }

    case RestrictionNodeType.INSURANCE: {
      return []
    }
  }
}
