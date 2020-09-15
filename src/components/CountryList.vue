<template>
  <div :class="['row', $style.row]">
    <q-select
      v-model="currentCountry"
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
    />
    <q-btn
      size="14px"
      round
      color="secondary"
      :icon="`img:${require('src/assets/search.svg')}`"
      text-color="primary"
      :class="$style.btn"
      @click="navigateToCountryPage(currentCountry.value)"
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
import {
  computed,
  defineComponent,
  onServerPrefetch,
  ref,
} from '@vue/composition-api'
import {
  getLabelForCountryCode,
  getFlagForCountryCode,
  getCountryList,
} from 'src/misc/I18nCountryList'
import { fetchCurrentCountryCode } from 'src/api/IpApi'
import {
  useCookies,
  useI18n,
  useRoute,
  useRouter,
  useStore,
} from 'src/composables/use-plugins'
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { Locale } from 'vue-i18n'
import { CountryCode } from 'src/i18n/CountryI18n'

interface ListItem {
  value: string
  label: string
}

type List = ListItem[]

export default defineComponent({
  setup() {
    const filteredList = ref([])
    const clearCountry = ref(false)

    const countryList = computed({
      get() {
        return filteredList.value
      },
      set(list: any) {
        filteredList.value = list
      },
    })

    const persistCountry = (countryCode: string) => {
      useStore().commit('setDetectedCountry', countryCode)
      useCookies().set('country', countryCode, {
        path: '/',
      })
    }

    const decideOnCountry = async () => {
      const countryCodeSources: (() => string | Promise<string>)[] = [
        () => useRoute().params.country,
        () => useCookies().get('country'),
        fetchCurrentCountryCode,
        () => 'us',
      ]

      for (const countryCodeSource of countryCodeSources) {
        const result = await countryCodeSource()
        if (result) {
          return result
        }
      }
    }

    const filterCountryList = (
      currentValue: string,
      update: { (callback: { (): void }): void },
    ) => {
      update(() => {
        // console.log(currentCountry)
        currentCountry.value = null
        // const needle = currentValue.value.value.toLowerCase()
        // console.log(currentValue)
        countryList.value = getCountryList().filter((listItem: ListItem) => {
          return listItem.label.toLowerCase().indexOf(currentValue) > -1
        })

        // console.log(filteredList)
      })
    }

    const currentCountry = computed({
      get() {
        if (clearCountry.value === true) {
          return null
        }

        const countryCode = useStore().state.detectedCountry
        return {
          label: getLabelForCountryCode(countryCode),
          value: countryCode,
        }
      },
      async set(countryPair: { value: string | null }) {
        if (!countryPair) {
          return
        }

        const country = countryPair.value
        persistCountry(country)
        if (country) {
          await navigateToCountryPage(country)
        }
      },
    })
    onServerPrefetch(async () => {
      persistCountry(await decideOnCountry())
    })

    return {
      countryList,
      currentCountry,
      getFlagForCountryCode,
      filterCountryList,
      clearCountry,
      icon,
      navigateToCountryPage,
    }
  },
})

async function navigateToCountryPage(country?: CountryCode) {
  await useRouter().push({
    name: 'country',
    params: { country, locale: useI18n().locale },
  })
}
</script>
