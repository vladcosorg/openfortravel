import type { WritableComputedRef } from 'vue'
import { computed, reactive } from 'vue'
import { QBtnToggle, QCheckbox, QInput } from 'quasar'

import CountryList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/country-list.vue'
import LanguageList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/language-list.vue'
import NewValueList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/new-value-list.vue'
import TestList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/test-list.vue'
import VaccineBrandList from '@/admin/src/pages/edit/components/restriction-tree/option-fields/vaccine-brand-list.vue'
import type { FieldConfig } from '@/admin/src/pages/edit/composables/field-config/helpers'

export function createTextInput(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  return {
    type: QInput,
    bind: reactive({
      standout: '',
      dense: true,
      unelevated: true,
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}

export function createOptionalNumberInput(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  const imodel = computed({
    get() {
      return model.value ?? 0
    },
    set(value) {
      const numberValue =
        typeof value === 'string' ? Number.parseInt(value, 10) : value

      if (numberValue === 0) {
        model.value = undefined
      }

      model.value = numberValue
    },
  })

  return {
    type: QInput,
    bind: reactive({
      value: imodel,
      standout: '',
      dense: true,
      unelevated: true,
      type: 'number',
      ...props,
    }),
    on: {
      input: (val: string[]) => (imodel.value = val),
    },
    attrs: {
      min: '0',
    },
  }
}

export function createCheckboxBoolean(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  return {
    type: QCheckbox,
    bind: reactive({
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}

export function createButtonToggle(
  model: WritableComputedRef<unknown>,
  props: FieldConfig['bind'],
): FieldConfig {
  return {
    type: QBtnToggle,
    bind: reactive({
      noCaps: true,
      dense: true,
      unelevated: true,
      color: 'blue-grey-4',
      toggleColor: 'blue-8',
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}

export function createLanguageList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: LanguageList,
    bind: reactive({
      label: 'Languages',
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}

export function createVaccineList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: VaccineBrandList,
    bind: reactive({
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}

export function createIssuerList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return createCountryList(
    {
      countries: model,
    },
    {
      class: 'col',
      label: 'Issuer',
      ...props,
    },
  )
}

export function createTestList(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: TestList,
    bind: reactive({
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}
export function createCountryList(
  {
    countries,
    not,
  }: {
    countries: WritableComputedRef<unknown>
    not?: WritableComputedRef<unknown>
  },
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: CountryList,
    bind: reactive({
      label: 'Countries',
      value: countries,
      not,
      ...props,
    }),
    on: {
      input: (val: string[]) => (countries.value = val),
      'update:not': (val: string) => (not.value = val),
    },
  }
}

export function createNewValueSelect(
  model: WritableComputedRef<unknown>,
  props?: FieldConfig['bind'],
): FieldConfig {
  return {
    type: NewValueList,
    class: props?.class as string,
    bind: reactive({
      value: model,
      ...props,
    }),
    on: {
      input: (val: string[]) => (model.value = val),
    },
  }
}
