<template>
  <q-select
    :value="$i18n.locale"
    :options="languageList"
    @input="handleChange"
    label="Quasar Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
</template>

<script lang="ts">
import {
  defineComponent, ref, watch
} from '@vue/composition-api'

export default defineComponent({
  name: 'LanguageSwitcher',

  setup (props, { root }) {
    const languageList = [
      { value: 'en-us', label: 'English' },
      { value: 'ro', label: 'Romanian' },
      { value: 'ru', label: 'Русский' }
    ]

    const handleChange = (locale) => {
      const to = root.$router.resolve({ params: { locale } })
      root.$q.cookies.set('locale', locale)
      root.$router.push(to.location)
    }

    return { languageList, handleChange }
  }
})
</script>
