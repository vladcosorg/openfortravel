<template>
  <q-field
    v-if="$q.platform.is.mobile"
    standout
    :loading="aggregatedLoading"
    stack-label
    :class="['full-width', $style.field]"
  >
    <!--    <template #before>-->
    <!--      <div :class="[$style.prefix, 'montserrat', 'text-subtitle2']">-->
    <!--        <slot />-->
    <!--      </div>-->
    <!--    </template>-->
    <template #prepend>
      <q-icon name="place" />
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
        v-model="currentCountry"
        :options="countryList"
      />
      <q-icon :name="icon" />
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
import { useVuexGetter } from 'src/composables/use-vuex'
import { getLabelForCountryCode } from 'src/misc/country-list'

export interface ListItem {
  value: string
  label: string
}

type List = ListItem[]

export default defineComponent({
  components: { InvisibleNativeSelect },
  props: {
    value: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const fullList = useVuexGetter<List>('getCountryListObjects')
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
    const currentCountry = computed<ListItem | undefined>({
      get() {
        return {
          label: getLabelForCountryCode(props.value),
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
    }
  },
})
</script>
