import { computed, ComputedRef, Ref, ref } from 'vue'

import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { AnyArgFunction, OptionList } from '@/shared/src/misc/type-helpers'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'

export function useCountryOptions(): ComputedRef<
  ReturnType<typeof transformFlatMapToArrayOfPairs>
> {
  return computed(() => transformFlatMapToArrayOfPairs(getOriginLabels()))
}

export function useFilterableOptions(
  modelValue: Ref<string>,
  options: Ref<OptionList>,
  isMultiple = false,
): {
  filterFunction: AnyArgFunction
  filteredOptions: ComputedRef<OptionList>
} {
  const maybeFilteredOptions = ref(options.value)
  const filterFunction = (
    query: string,
    update: { (callback: { (): void }): void },
  ) => {
    if (query === '') {
      update(() => {
        maybeFilteredOptions.value = options.value
      })
      return
    }

    update(() => {
      const regex = new RegExp(`.*${query}.*`, 'i')
      const matches = options.value.filter(
        (lang) => regex.test(lang.value) || regex.test(lang.label),
      )

      matches.sort((a, b) => a.label.indexOf(query) - b.label.indexOf(query))
      maybeFilteredOptions.value = matches
    })
  }

  const filteredOptions = computed(() => {
    const options = [...maybeFilteredOptions.value]

    if (!isMultiple) {
      return options
    }

    options.sort(
      (a, b) =>
        modelValue.value.includes(b.value) - modelValue.value.includes(a.value),
    )

    return options
  })

  return { filterFunction, filteredOptions }
}

export function useEnv(): {
  env: {
    isProd: boolean
    isDev: boolean
  }
} {
  return {
    env: {
      isProd: process.env.NODE_ENV === 'production',
      isDev: process.env.NODE_ENV !== 'production',
    },
  }
}
