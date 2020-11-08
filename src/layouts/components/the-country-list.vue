<template>
  <div :class="['row', $style.row, 'justify-center']">
    <div :class="[$style.intro, 'q-mb-xs', 'montserrat']">
      {{ $t('intro.title') }}
    </div>

    <q-field
      v-if="$q.platform.is.mobile"
      standout
      :class="[showButton ? 'col' : 'col-12']"
      :loading="loading"
      stack-label
      class="full-width"
    >
      <template #before>
        <div
          style="font-size: 0.8rem"
          :class="[$style.intro, 'montserrat', 'text-subtitle2']"
        >
          From
        </div>
      </template>
      <template #prepend>
        <q-icon name="place" />
      </template>

      <template #control>
        <div :class="['self-center full-width no-outline', $style.label]">
          {{ currentCountry.label }}
        </div>
      </template>

      <template #append>
        <invisible-native-select
          :value="currentCountry"
          :options="countryList"
          @input="navigateToCountryPage"
        />
        <q-icon :name="icon" />
      </template>
    </q-field>

    <!--        <native-mobile-select-->
    <!--          :options="countryList"-->
    <!--          :value="currentCountry"-->
    <!--          :class="[showButton ? 'col' : 'col-12', $style.select]"-->
    <!--          :dropdown-icon="icon"-->
    <!--          options-dense-->
    <!--          borderless-->
    <!--          item-aligned-->
    <!--          :loading="loading"-->
    <!--          :disable="loading"-->
    <!--          use-input-->
    <!--          hide-selected-->
    <!--          fill-input-->
    <!--          @filter="filterCountryList"-->
    <!--          @input="navigateToCountryPage"-->
    <!--        />-->
    <q-btn
      v-if="showButton"
      size="14px"
      round
      color="secondary"
      :icon="`img:${require('src/assets/search.svg')}`"
      text-color="primary"
      :class="$style.btn"
      :disable="loading"
      :loading="loading"
      :percentage="20"
      @click="navigateToCountryPage()"
    />
  </div>
</template>

<style lang="scss" module>
.label {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.intro {
  text-shadow: 1px 1px 5px $primary;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.select {
  :global {
    .q-field {
      padding: 0;
      margin-right: 10px;
      height: 70px;
    }
    .q-field__control {
      border-radius: 50px;
      box-shadow: $shadow-5;
      padding: 5px 20px;
      height: 100%;
      background-color: white;
    }

    .q-field__input,
    .q-field__append,
    .q-field__native {
      color: $primary;
      font-weight: bold;
      text-transform: uppercase;
    }

    .q-field__native span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.btn {
  height: 70px;
  width: 70px;
  box-shadow: $shadow-8;

  :global {
    .q-icon {
      margin-left: 2px;
      margin-bottom: 2px;
    }
  }
}
</style>
<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { computed, defineComponent, ref } from '@vue/composition-api'

import InvisibleNativeSelect from 'src/components/invisible-native-select.vue'
import NativeMobileSelect from 'src/components/native-mobile-select.vue'
import { useI18n, useRouter, useStore } from 'src/composables/use-plugins'
import {
  useAggregatedLoader,
  useClosureLoading,
} from 'src/composables/use-promise-loading'
import { useVuexGetter } from 'src/composables/use-vuex'
import { getCurrentCountry } from 'src/misc/country-decider'
import { getLabelForCountryCode } from 'src/misc/country-list'

interface ListItem {
  value: string
  label: string
}

type List = ListItem[]

export default defineComponent({
  components: { InvisibleNativeSelect, NativeMobileSelect },
  props: {
    showButton: {
      type: Boolean,
    },
  },
  setup() {
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

    const {
      loading: eventLoading,
      callback: navigateToCountryPage,
    } = useClosureLoading(async (originCode?: string) => {
      await useRouter().push({
        name: 'origin',
        params: {
          originCode: originCode ?? getCurrentCountry(),
          locale: useI18n().locale,
        },
      })
    })

    const loading = useAggregatedLoader(
      computed(() => useStore().state.countrySelectorLoading),
      eventLoading,
    )
    const currentCountry = computed<ListItem | undefined>(() => {
      const countryCode = getCurrentCountry()
      return {
        label: getLabelForCountryCode(countryCode),
        value: countryCode,
      }
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
      loading,
      countryList,
      currentCountry,
      filterCountryList,
      icon,
      navigateToCountryPage,
    }
  },
})
</script>
