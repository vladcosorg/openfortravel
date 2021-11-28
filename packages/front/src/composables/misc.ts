import debounce from 'lodash/debounce'
import { computed, ComputedRef, Ref, ref, readonly, DeepReadonly } from 'vue'

import { transformFlatMapToArrayOfPairs } from '@/shared/src/misc/misc'
import { AnyArgFunction, OptionList } from '@/shared/src/misc/type-helpers'
import { getOriginLabels } from '@/shared/src/modules/country-list/country-list-helpers'
import { VaccineBrand } from '@/shared/src/restriction-tree/restriction-node/vaccinated'

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

export function useDelayedSetter<T extends Ref>(
  innerRef: T,
): {
  model: T
  isBuffering: ComputedRef<boolean>
} {
  const buffer = ref() as T
  const isBuffering = computed(() => buffer.value !== undefined)
  const debouncedSetter = debounce((value) => {
    innerRef.value = value
    buffer.value = undefined
  }, 400)
  const model = computed({
    get() {
      return buffer.value === undefined ? innerRef.value : buffer.value
    },
    set(value: false | VaccineBrand) {
      buffer.value = value
      debouncedSetter(value)
    },
  }) as unknown as T

  return { model, isBuffering }
}

export function useCollectionToggle<T extends string[], V extends string>(
  collectionItems: T,
): {
  currentValue: DeepReadonly<Ref<V>>
  setValue: (value: V) => void
  next: () => void
} {
  const iterator = createCycleableArrayIterator(collectionItems)

  const currentValue = ref(iterator.next().value)

  const next = () => {
    currentValue.value = iterator.next().value
  }

  const setValue = (value: V) => {
    currentValue.value = value
    iterator.setCurrentValue(value)
  }

  return { currentValue: readonly(currentValue) as any, next, setValue }
}

function createCycleableArrayIterator(
  items: string[],
): { setCurrentValue: (value: string) => void } & Iterator<
  string,
  string,
  string
> {
  let index: undefined | number
  const collectionSize = items.length
  return {
    next() {
      if (index === undefined) {
        index = 0
      } else {
        index++
      }

      if (index >= collectionSize) {
        index = 0
      }

      return {
        value: items[index],
        done: false,
      }
    },
    setCurrentValue(value) {
      index = items.indexOf(value)
    },
  }
}
