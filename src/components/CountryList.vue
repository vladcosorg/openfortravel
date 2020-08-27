<template>
  <q-select
    :value="currentCountry"
    :options="countryList"
    @input="handleChange"
    dense
    borderless
    emit-value
    map-options
    options-dense
    use-input
  />
</template>

<script lang="ts">
import {
  defineComponent, watch, computed, toRef
} from '@vue/composition-api'
import axios from 'axios'
import { Cookies } from 'quasar'
const fetchCountryList = async (locale: string) => {
  locale = locale.split('-')[0]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let translations = await import(
    (`i18n-iso-countries/langs/${locale}.json`)
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  translations = (translations.default.countries) as Record<string, string>
  const out = Object.keys(translations).map(key => ({
    value: key.toLowerCase(),
    label: translations[key]
  }))

  return Object.freeze(out)
}

const detectCountry = async (cookies: Cookies) => {
  let countryCode = cookies.get('country')

  if (!countryCode) {
    const response = await axios('http://ip-api.com/json/')
    countryCode = response.data.countryCode as string
    countryCode = countryCode.toLowerCase()
    cookies.set('country', countryCode)
  }

  return countryCode
}

export default defineComponent({
  name: 'CountryList',

  async serverPrefetch (this) {
    this.$store.commit('setDetectedCountry', await detectCountry(this.$q.cookies))
    this.$store.commit('setCountryList', await fetchCountryList(this.$i18n.locale))
  },
  setup (props, { root }) {
    const currentLanguage = toRef(root.$i18n, 'locale')
    const currentCountry = computed({
      get () {
        return root.$store.state.detectedCountry
        // return root.$route.params.country
      },
      set (country) {
        root.$store.commit('setDetectedCountry', country)
      }
    })

    const countryList = computed({
      get () {
        return root.$store.state.countryList
      },
      set (countryList) {
        root.$store.commit('setCountryList', countryList)
      }
    })

    watch(currentLanguage, async (newLocale) => {
      countryList.value = await fetchCountryList(newLocale)
    })

    const handleChange = (country: string) => {
      const to = root.$router.resolve({ params: { country } })

      root.$router.push(to.location)
    }

    return { countryList, currentCountry, handleChange }
  }
})
</script>
