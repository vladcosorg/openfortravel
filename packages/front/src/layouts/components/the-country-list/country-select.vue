<template>
  <component
    :is="isMobile ? 'q-field' : 'q-select'"
    v-model="currentCountry"
    v-bind="componentArgs"
    standout
    :loading="aggregatedLoading"
    stack-label
    :dropdown-icon="icon"
    :options="countryList"
    :class="['full-width text-h6', $style.field]"
  >
    <template v-if="showPrefixText" #before>
      <div :class="[$style.prefix, 'text-subtitle2']">
        <slot name="default" />
      </div>
    </template>

    <template v-if="isMobile" #control>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutRight"
        mode="out-in"
      >
        <div
          :key="currentCountry.value"
          :class="['self-center full-width no-outline text-h6', $style.label]"
        >
          {{ currentCountry.label }}
        </div>
      </transition>
    </template>

    <template v-if="isMobile" #append>
      <invisible-native-select
        v-model="currentCountryValueRef"
        :options="countryList"
      />
      <q-icon :name="icon" />
    </template>

    <template #after>
      <slot name="after" />
    </template>
  </component>
</template>

<style lang="scss" module>
.field {
  :global {
    .q-field__before {
      width: 20%;
    }
  }
}
.prefix {
  text-shadow: 1px 1px 5px $primary;
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

import { useStore } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'
import {
  CountryList,
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
} from '@/shared/src/modules/country-list/country-list-helpers'
import InvisibleNativeSelect from 'src/components/invisible-native-select.vue'

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
      required: true,
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
  },
  setup(props, { emit, root }) {
    const fullList = computed<List>(() => {
      const list = props.isDestination
        ? useVuexRawGetter<CountryList>('modules/countryList/destinationLabels')
        : useVuexRawGetter<CountryList>('modules/countryList/originLabels')

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
      computed(() => useStore().state.countrySelectorLoading),
      toRef(props, 'loading'),
    )

    const currentCountryValueRef = computed<string>({
      get() {
        return props.value
      },
      set(value) {
        emit('input', value)
      },
    })

    const currentCountry = computed<ListItem>({
      get() {
        return {
          label: props.isDestination
            ? getDestinationLabelForCountryCode(props.value)
            : getOriginLabelForCountryCode(props.value),
          value: props.value,
        }
      },
      set(item) {
        currentCountryValueRef.value = item.value
      },
    })

    const filterCountryList = (
      currentValue: string,
      update: { (callback: { (): void }): void },
    ) => {
      update(() => {
        countryList.value = fullList.value.filter((listItem: ListItem) =>
          listItem.label.toLowerCase().includes(currentValue),
        )
      })
    }

    const isMobile = computed(() => root.$q.platform.is.mobile)
    const componentArgs = computed(() => {
      if (isMobile.value) {
        return {}
      }

      return {
        dropdownIcon: icon,
        options: countryList,
        behaviour: 'menu',
        optionsCover: true,
        useInput: true,
        hideSelected: true,
        fillInput: true,
        optionsSelectedClass: 'text-bold text-white',
      }
    })

    return {
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
