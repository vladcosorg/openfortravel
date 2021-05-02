import type { WritableComputedRef } from '@vue/composition-api'
import { QBtnToggle, QInput } from 'quasar'

import CountryList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/country-list.vue'
import LanguageList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/language-list.vue'
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
      color: 'blue-grey-8',
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
