<template>
  <div :class="['row', $style.row]">
    <q-select
      :value="currentCountry"
      :options="countryList"
      options-dense
      :class="[$style.select, 'col']"
      :clearable="null"
      borderless
      item-aligned
      use-input
      bg-color="white"
      :dropdown-icon="icon"
      @filter="filterCountryList"
      @focus="clearCountry = true"
      @blur="clearCountry = false"
      @popup-hide="clearCountry = false"
      @input="navigateToCountryPage"
    />
    <q-btn
      size="14px"
      round
      color="secondary"
      :icon="`img:${require('src/assets/search.svg')}`"
      text-color="primary"
      :class="$style.btn"
      @click="navigateToCountryPage(currentCountry)"
    />
  </div>
</template>

<style lang="scss" module>
.select {
  padding: 0;
  margin-right: 10px;
  height: 70px;

  :global {
    .q-field__control {
      border-radius: 50px;
      box-shadow: $shadow-5;
      padding: 5px 20px;
      height: 100%;
    }

    .q-field__native,
    .q-field__append {
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

:global(.mobile) {
  .select {
    :global(.q-field__input) {
      display: none;
    }
  }
}
</style>
<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useI18n, useRouter } from 'src/composables/use-plugins'
import { getCurrentCountry } from 'src/misc/country-decider'
import {
  getCountryList,
  getLabelForCountryCode,
} from 'src/misc/i18n-country-list'

interface ListItem {
  value: string
  label: string
}

type List = ListItem[]

export default defineComponent({
  setup() {
    const filteredList = ref<List>([])
    const clearCountry = ref(false)

    const countryList = computed({
      get(): List {
        return filteredList.value
      },
      set(list: List) {
        filteredList.value = list
      },
    })

    const currentCountry = computed<ListItem | undefined>(() => {
      if (clearCountry.value === true) {
        return
      }

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
        // currentCountry.value = null
        countryList.value = getCountryList().filter((listItem: ListItem) => {
          return listItem.label.toLowerCase().includes(currentValue)
        })
      })
    }

    return {
      countryList,
      currentCountry,
      filterCountryList,
      clearCountry,
      icon,
      navigateToCountryPage,
    }
  },
})

function navigateToCountryPage(origin: ListItem) {
  void useRouter().push({
    name: 'origin',
    params: { originCode: origin.value, locale: useI18n().locale },
  })
}
</script>
