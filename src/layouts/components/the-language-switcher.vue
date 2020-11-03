<template>
  <div>
    <native-mobile-select
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
  </div>
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
import { computed, defineComponent } from '@vue/composition-api'
import langs from 'iso-language-list/dist/generated/top10-speakers-then-az-value-label.json'

import NativeMobileSelect from 'src/components/native-mobile-select.vue'
import { useCookies, useRouter } from 'src/composables/use-plugins'
import { useLoading } from 'src/composables/use-promise-loading'

export default defineComponent({
  name: 'LanguageSwitcher',
  components: { NativeMobileSelect },
  setup(props, { root }) {
    const languageList = Object.freeze(langs)
    const { loading } = useLoading(false)
    const currentLanguage = computed({
      get() {
        return root.$i18n.locale
      },
      set(locale: string) {
        loading.value = true
        setTimeout(() => (loading.value = false), 1000)
        const to = root.$router.resolve({ params: { locale } })
        useCookies().set('locale', locale, {
          path: '/',
        })
        useRouter().push(to.location)
      },
    })

    return { languageList, icon, currentLanguage, loading }
  },
})
</script>
