<template>
  <simple-select
    v-model="currentLanguage"
    :options="languageList"
    bg-color="accent"
    :loading="loading"
    borderless
    emit-value
    options-dense
    :class="[$style.select]"
    :dropdown-icon="icon"
  />
</template>
<style lang="scss" module>
.select {
  :global {
    .q-field__control {
      border-radius: 14px;
      padding: 0 8px;
      font-size: 0.75rem;
    }
    .q-field__control,
    .q-field__native {
      // 'Important' needed to increase specificity against native quasar styles
      min-height: auto !important;
    }
    .q-field__native,
    .q-field__append {
      color: $primary !important;
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
import { computed, defineComponent } from '@vue/composition-api'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'

import SimpleSelect from 'src/components/simple-select.vue'
import { useEventBus } from 'src/composables/use-plugins'
import { useLoading } from 'src/composables/use-promise-loading'
import { useVuexRawState } from 'src/composables/use-vuex'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: { SimpleSelect },
  setup(props, { root }) {
    const availableLocales = useVuexRawState<string[]>('availableLocales')
    const languageList = Object.freeze(
      langs.filter((langPair) => availableLocales.includes(langPair.value)),
    )

    const { loading } = useLoading(false)
    const currentLanguage = computed({
      get() {
        return root.$i18n.locale
      },
      async set(locale: string) {
        loading.value = true
        useEventBus().$emit('locale-change', locale)
        // await changeLocale(locale)
        setTimeout(() => (loading.value = false), 500)
      },
    })

    return { languageList, icon, currentLanguage, loading }
  },
})
</script>
