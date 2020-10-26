<template>
  <q-select
    :value="$i18n.locale"
    :options="languageList"
    bg-color="accent"
    borderless
    emit-value
    options-dense
    :class="[$style.select]"
    :dropdown-icon="icon"
    @input="handleChange"
  />
</template>
<style lang="scss" module>
.select {
  :global {
    .q-field__control {
      border-radius: 14px;
      min-height: auto;
      padding: 0 8px;
      font-size: 0.75rem;
    }
    .q-field__native,
    .q-field__append {
      color: $primary;
      font-weight: bold;
      text-transform: uppercase;
      min-height: auto;
      height: auto;
    }

    .q-field__append {
      padding-left: 0;
    }
  }
}
</style>
<script lang="ts">
import { roundExpandMore as icon } from '@quasar/extras/material-icons-round'
import { defineComponent } from '@vue/composition-api'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'

import { useCookies, useRouter } from 'src/composables/use-plugins'

export default defineComponent({
  name: 'LanguageSwitcher',

  setup(props, { root }) {
    const languageList = Object.freeze(langs)

    const handleChange = async (locale: string) => {
      const to = root.$router.resolve({ params: { locale } })
      useCookies().set('locale', locale, {
        path: '/',
      })
      await useRouter().push(to.location)
    }

    return { languageList, handleChange, icon }
  },
})
</script>
