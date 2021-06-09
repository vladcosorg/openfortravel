import type { WritableComputedRef } from '@vue/composition-api'
import { computed } from '@vue/composition-api'
import { QBtnToggle, QInput } from 'quasar'

import CountryList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/country-list.vue'
import LanguageList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/language-list.vue'
import TestList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/test-list.vue'
import VaccineBrandList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/vaccine-brand-list.vue'
import type { FieldConfig } from '@/admin/src/pages/edit/composables/field-config/helpers'

export function createTextInput(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  return {
    type: QInput,
    bind: {
      standout: '',
      dense: true,
      unelevated: true,
      ...props,
    },
    model,
  }
}

export function createOptionalNumberInput(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  return {
    type: QInput,
    bind: {
      standout: '',
      dense: true,
      unelevated: true,
      type: 'number',
      ...props,
    },
    model: computed({
      get() {
        return model.value ?? 0
      },
      set(value) {
        if (value === 0) {
          model.value = undefined
        }

        model.value = value
      },
    }),
  }
}

export function createButtonToggle(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  return {
    type: QBtnToggle,
    bind: {
      noCaps: true,
      dense: true,
      unelevated: true,
      color: 'blue-grey-4',
      toggleColor: 'teal-8',
      ...props,
    },
    model,
  }
}

export function createLanguageList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: LanguageList,
    bind: {
      label: 'Languages',
      ...props,
    },
    model,
  }
}

export function createVaccineList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: VaccineBrandList,
    bind: {
      ...props,
    },
    model,
  }
}
export function createTestList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: TestList,
    bind: {
      ...props,
    },
    model,
  }
}
export function createCountryList(
  {
    countries,
    not,
  }: {
    countries: WritableComputedRef<unknown>
    not: WritableComputedRef<unknown>
  },
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: CountryList,
    bind: {
      label: 'Countries',
      not: not.value,
      ...props,
    },
    model: countries,
    on: {
      'update:not': (val: string) => (not.value = val),
    },
  }
}
