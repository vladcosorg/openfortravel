<template>
  <component
    :is="isMobile ? 'q-field' : 'q-select'"
    v-model="currentCountry"
    :label="isMobile ? label : undefined"
    v-bind="componentArgs"
    standout
    :loading="aggregatedLoading"
    stack-label
    :placeholder="$t('components.theCountryList.placeholder')"
    :dropdown-icon="icon"
    :class="['text-h6', $style.field]"
    @filter="filterCountryList"
  >
    <template v-if="showPrefixText && !isMobile && label" #prepend>
      <div :class="[$style.prefix, 'text-subtitle2']">
        {{ label }}
      </div>
    </template>
    <template v-if="isMobile" #control>
      <div
        v-if="currentCountry"
        :class="`self-center full-width no-outline text-h6 ${$style.label}`"
      >
        {{ currentCountry.label }}
      </div>
      <div v-else class="text-primary-subtle">
        {{ $t('components.theCountryList.placeholder') }}
      </div>
    </template>

    <template v-if="isMobile" #append>
      <invisible-native-select
        v-model="currentCountryValueRef"
        :options="nativeList"
      />
    </template>

    <template #after>
      <slot name="after" />
    </template>
  </component>
</template>

<style lang="scss" module>
.field {
  //background-color: #32498b;
  :global {
    .q-field__before {
      width: 20%;
    }
  }
}
.prefix {
  text-shadow: 1px 1px 5px $dark;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: white;
}
.label {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { computed, defineComponent, ref, toRef } from '@vue/composition-api'

import InvisibleNativeSelect from '@/front/src/components/invisible-native-select.vue'
import { useStore } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'
import {
  CountryList,
  getDestinationLabelForCountryCode,
  getDestinationLabels,
  getOriginLabelForCountryCode,
  getOriginLabels,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { sortByKeywordIndex } from '@/shared/src/misc/misc'

export interface ListItem {
  value: string
  label: string
}

type List = ListItem[]

export default defineComponent({
  components: { InvisibleNativeSelect },
  props: {
    isDestination: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    showPrefixText: {
      type: Boolean,
      required: false,
      default: true,
    },
    label: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit, root }) {
    const isMobile = computed(() => root.$q.platform.is.mobile)
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const nativeList = (): CountryList =>
      useVuexRawGetter<CountryList>('modules/countryList/originByContinent')

    const fullList = computed<List>(() => {
      const list = props.isDestination
        ? getOriginLabels()
        : getDestinationLabels()

      return Object.keys(list).map((key) => ({
        value: key,
        label: list[key],
      }))
    })
    const filteredList = ref<List | undefined>()
    const countryList = computed({
      get(): List {
        if (!filteredList.value) {
          return fullList.value
        }

        return filteredList.value
      },
      set(list: List) {
        filteredList.value = list
      },
    })

    const loadingRef = useAggregatedLoader(
      computed(() => useStore().state['countrySelectorLoading']),
      toRef(props, 'loading'),
    )

    const currentCountryValueRef = computed<string | undefined>({
      get() {
        return props.value
      },
      set(value) {
        emit('input', value)
      },
    })

    const currentCountry = computed<ListItem | undefined>({
      get() {
        if (!props.value) {
          return
        }

        return {
          label: props.isDestination
            ? getDestinationLabelForCountryCode(props.value)
            : getOriginLabelForCountryCode(props.value),
          value: props.value,
        }
      },
      set(item) {
        currentCountryValueRef.value = item?.value
      },
    })

    const filterCountryList = (
      currentValue: string,
      update: { (callback: { (): void }): void },
    ) => {
      if (currentValue.length === 0) {
        update(() => {
          countryList.value = fullList.value
        })
        return
      }

      currentValue = currentValue.toLowerCase()
      update(() => {
        countryList.value = sortByKeywordIndex(
          currentValue,
          fullList.value.filter((listItem: ListItem) =>
            listItem.label.toLowerCase().includes(currentValue),
          ),
          (entry) => entry.label,
        )
      })
    }

    const componentArgs = computed(() => {
      if (isMobile.value) {
        return {}
      }

      return {
        dropdownIcon: icon,
        options: countryList.value,
        behaviour: 'menu',
        optionsCover: true,
        useInput: true,
        hideSelected: true,
        fillInput: true,
        optionsSelectedClass: 'text-bold text-white',
      }
    })

    return {
      nativeList,
      isMobile,
      componentArgs,
      aggregatedLoading: loadingRef,
      countryList,
      currentCountry,
      filterCountryList,
      icon,
      currentCountryValueRef,
    }
  },
})
</script>
