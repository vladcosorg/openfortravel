<template>
  <the-breadcrumbs :items="breadcrumbs" />
  <div class="bg-elevation-1 overflow-auto q-pb- q-pt-md q-mb-lg">
    <div class="container">
      <div class="text-h5 text-center col-12 intro">
        {{ $t('components.theCountryList.title') }}
      </div>

      <div class="row q-col-gutter-md q-mt-sm wrap">
        <country-select
          :key="currentOrigin"
          v-model="currentOrigin"
          class="col-sm-4 col-12"
          :loading="loading"
          :label="$t('components.theCountryList.from')"
          :show-prefix-text="!!originCode"
        />
        <citizenship-context class="col-sm-4 col-12" />
        <did-not-visit-countries-context class="col-sm-4 col-12" />
        <vaccination-context class="col-sm-4 col-12" />
        <recovery-context class="col-sm-4 col-12" />
      </div>
      <q-separator class="q-my-lg" />
      <div class="row q-gutter-x-md q-mb-lg">
        <input-filter
          model-value=""
          class="col-4"
          :is-loading="false"
          :origin-code="originCode"
        />
        <the-sort />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  text-shadow: 1px 1px 5px $dark;
  font-weight: bold;
  text-transform: uppercase;
}
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import CitizenshipContext from '@/front/src/components/context-field/citizenship/citizenship-context.vue'
import RecoveryContext from '@/front/src/components/context-field/recovery/recovery-context.vue'
import VaccinationContext from '@/front/src/components/context-field/vaccination/vaccination-context.vue'
import DidNotVisitCountriesContext from '@/front/src/components/context-field/visited/did-not-visit-countries-context.vue'
import CountrySelect from '@/front/src/layouts/components/the-country-list/country-select.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import { getPersistedOriginOrDefault } from '@/front/src/misc/country-decider'
import TheSort from '@/front/src/pages/country/components/header/the-sort.vue'
import InputFilter from '@/front/src/pages/country/components/input-filter.vue'
import TheSearchStats from '@/front/src/pages/country/components/the-search-stats.vue'
import { useBreadcrumbs } from '@/front/src/pages/country/composable'
import {
  useRouter,
  useI18n,
  useRootStore,
} from '@/shared/src/composables/use-plugins'
import { useClosureLoading } from '@/shared/src/composables/use-promise-loading'
import { transformCountryCodeToOriginSlug } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: {
    TheSort,
    InputFilter,
    TheSearchStats,
    TheBreadcrumbs,
    RecoveryContext,
    DidNotVisitCountriesContext,
    VaccinationContext,
    CitizenshipContext,
    CountrySelect,
  },
  setup() {
    const originCode = computed(() => useRootStore().getters.visitorOrigin)
    const breadcrumbs = useBreadcrumbs(originCode)
    const { loading: loadingRef, callback: navigateToPage } = useClosureLoading(
      async (originCode: string): Promise<void> => {
        await useRouter().push({
          name: 'origin',
          params: {
            originSlug: transformCountryCodeToOriginSlug(originCode),
            locale: useI18n().locale,
          },
        })
      },
    )

    const originValueRef = computed({
      get() {
        return originCode.value ?? getPersistedOriginOrDefault()
      },
      set(newOriginCode) {
        void navigateToPage(newOriginCode)
      },
    })

    return {
      breadcrumbs,
      loading: loadingRef,
      navigateToPage,
      currentOrigin: originValueRef,
      originCode,
    }
  },
})
</script>
