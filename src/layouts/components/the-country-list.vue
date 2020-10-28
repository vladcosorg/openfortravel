<template>
  <div :class="['row', $style.row]">
    <q-select
      :value="currentCountry"
      :options="countryList"
      options-dense
      :class="[$style.select, 'col']"
      borderless
      item-aligned
      use-input
      hide-selected
      fill-input
      :dropdown-icon="icon"
      @filter="filterCountryList"
      @input="navigateToCountryPage"
    />
    <q-btn
      v-if="showButton"
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
      background-color: white;
    }

    .q-field__input,
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
</style>
<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useI18n, useRouter } from 'src/composables/use-plugins'
import { getCurrentCountry } from 'src/misc/country-decider'
import { getCountryList, getLabelForCountryCode } from 'src/misc/country-list'

interface ListItem {
  value: string
  label: string
}

type List = ListItem[]

export default defineComponent({
  props: {
    showButton: {
      type: Boolean,
    },
  },
  setup() {
    const filteredList = ref<List>([])
    const fullList = getCountryList()

    const countryList = computed({
      get(): List {
        return filteredList.value
      },
      set(list: List) {
        filteredList.value = list
      },
    })

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
        countryList.value = fullList.filter((listItem: ListItem) => {
          return listItem.label.toLowerCase().includes(currentValue)
        })
      })
    }

    return {
      countryList,
      currentCountry,
      filterCountryList,
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
