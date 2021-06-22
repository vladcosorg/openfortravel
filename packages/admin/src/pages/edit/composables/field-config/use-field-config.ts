import type { Ref, SetupContext } from '@vue/composition-api'

import {
  createButtonToggle,
  createCheckboxBoolean,
  createCountryList,
  createLanguageList,
  createOptionalNumberInput,
  createTestList,
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
        createOptionalNumberInput(setters.age, {
          label: 'Age limit',
          suffix: 'years old',
          style: 'width: 120px',
        }),
      ]
    }

    case RestrictionNodeType.PCR_TEST: {
      const setters = getSetters(type, options, emit)

      return [
        createButtonToggle(setters.beforeArrival, {
          options: [
            { label: 'Before arrival', value: true },
            { label: 'After arrival', value: false },
          ],
        }),
        createOptionalNumberInput(setters.hoursBeforeArrival, {
          label: 'Within timeframe',
          suffix: 'h',
          style: 'width: 120px',
        }),

        createTestList(setters.types),
        createLanguageList(setters.languages),
      ]
    }

    case RestrictionNodeType.ORIGIN: {
      const setters = getSetters(type, options, emit)
      return [
        createCountryList(
          {
            countries: setters.allowedOrigins,
            not: setters.not,
          },
          {
            class: 'col-12',
          },
        ),
      ]
    }

    case RestrictionNodeType.CUSTOM_REQUIREMENT: {
      return []
    }

    case RestrictionNodeType.CITIZENSHIP: {
      const setters = getSetters(type, options, emit)

      return [
        createCountryList(
          {
            countries: setters.allowedCitizenship,
            not: setters.not,
          },
          {
            class: 'col-12',
          },
        ),
      ]
    }

    case RestrictionNodeType.DID_NOT_VISIT_COUNTRIES: {
      if (options.value.exclude === true) {
        options.value.inverseSelection = true
        delete options.value.exclude
      }

      const setters = getSetters(type, options, emit)
      // if (options.exclude === true) {
      // setters.inverseSelection.value = true
      // }
      return [
        createCountryList(
          {
            countries: setters.countryCodes,
            not: setters.inverseSelection,
          },
          {
            class: 'col',
          },
        ),
        createOptionalNumberInput(setters.days, {
          label: 'In the last',
          suffix: 'days',
        }),
        createCheckboxBoolean(setters.matchEmpty, {
          label: 'Match empty',
        }),
      ]
    }

    case RestrictionNodeType.QUARANTINE: {
      const setters = getSetters(type, options, emit)

      return [
        createOptionalNumberInput(setters.days, {
          label: 'Quarantine length',
          suffix: 'days',
        }),
        createOptionalNumberInput(setters.earlyReleaseDays, {
          label: 'Early release after',
          suffix: 'days',
          hint: 'Leave 0 if no early release',
        }),
      ]
    }

    case RestrictionNodeType.VACCINATED: {
      const setters = getSetters(type, options, emit)

      return [
        createOptionalNumberInput(setters.daysAgo, { label: 'Days ago' }),
        createOptionalNumberInput(setters.monthsAtMost, {
          label: 'Months at most',
        }),
        createVaccineList(setters.authorizedBrands),
        createButtonToggle(setters.partial, {
          options: [
            { label: 'Full', value: false },
            { label: 'Partial', value: true },
          ],
        }),
        createLanguageList(setters.languages),
      ]
    }

    case RestrictionNodeType.RECOVERY: {
      const setters = getSetters(type, options, emit)

      return [
        createOptionalNumberInput(setters.daysAtLeast, {
          label: 'Days at least',
        }),
        createOptionalNumberInput(setters.daysAtMost, {
          label: 'Days at most',
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
          class: 'col-6',
        }),
      ]
    }

    case RestrictionNodeType.INSURANCE: {
      return []
    }
  }
}
