<template>
  <q-field
    v-if="$q.platform.is.mobile"
    standout
    :loading="aggregatedLoading"
    stack-label
    :class="['full-width', $style.field]"
  >
    <template v-if="showPrefixText" #before>
      <div :class="[$style.prefix, 'montserrat', 'text-subtitle2']">
        <slot name="default" />
      </div>
    </template>

    <template #control>
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

    <template #append>
      <invisible-native-select
        v-model="currentCountryValueRef"
        :options="countryList"
      />
      <q-icon :name="icon" />
    </template>

    <template #after>
      <slot name="after"></slot>
    </template>
  </q-field>
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

import InvisibleNativeSelect from 'src/components/invisible-native-select.vue'
import { useStore } from 'src/composables/use-plugins'
import { useAggregatedLoader } from 'src/composables/use-promise-loading'
import { useVuexRawGetter } from 'src/composables/use-vuex'
import {
  getDestinationLabelForCountryCode,
  getOriginLabelForCountryCode,
} from 'src/modules/country-list/country-list-helpers'

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
  setup(props, { emit }) {
    const fullList = computed<List>(() => {
      const list = props.isDestination
        ? useVuexRawGetter('modules/countryList/destinationLabels')
        : useVuexRawGetter('modules/countryList/originLabels')

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

    const currentCountry = computed<ListItem | undefined>({
      get() {
        return {
          label: props.isDestination
            ? getDestinationLabelForCountryCode(props.value)
            : getOriginLabelForCountryCode(props.value),
          value: props.value,
        }
      },
      set(value) {
        emit('input', value)
      },
    })

    const filterCountryList = (
      currentValue: string,
      update: { (callback: { (): void }): void },
    ) => {
      update(() => {
        countryList.value = fullList.value.filter((listItem: ListItem) => {
          return listItem.label.toLowerCase().includes(currentValue)
        })
      })
    }

    return {
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
