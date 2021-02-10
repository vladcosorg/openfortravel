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
      color: $dark !important;
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
import { computed, defineComponent, ref } from '@vue/composition-api'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'

import SimpleSelect from '@/front/src/components/simple-select.vue'
import { useEventBus } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import { useVuexRawStateProperty } from '@/shared/src/composables/use-vuex'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: { SimpleSelect },
  setup(_props, { root }) {
    const availableLocales = useVuexRawStateProperty<string[]>(
      'availableLocales',
    )
    const upcomingLocale = ref<string | undefined>()
    const languageList = Object.freeze(
      langs.filter((langPair) => availableLocales.includes(langPair.value)),
    )

    const { loading } = useLoading(false)
    const currentLanguage = computed({
      get() {
        if (root.$i18n.locale === upcomingLocale.value) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          upcomingLocale.value = undefined
        }

        if (upcomingLocale.value === undefined) {
          return root.$i18n.locale
        }

        return upcomingLocale.value
      },
      async set(locale: string) {
        loading.value = true
        upcomingLocale.value = locale
        useEventBus().$emit('locale-change', locale, () => {
          loading.value = false
        })
      },
    })

    return { languageList, icon, currentLanguage, loading }
  },
})
</script>
