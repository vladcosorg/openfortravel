<template>
  <div class="container">
    <portal to="under-header">
      <the-breadcrumbs
        :items="breadcrumbs.items"
        :loading="breadcrumbs.loading"
        :origin-slug="breadcrumbs.originSlug"
      />
    </portal>
    <div class="justify-center q-gutter-lg">
      <div class="text-h6 text-center text-uppercase">
        {{ $t('page.country.destinations') }}
      </div>
      <search-tabs v-model="tabFilterValue" :origin-code="originCode" />
      <q-input
        v-model="countryMatchFilterValue"
        :placeholder="$t('page.country.quickSearch')"
        :loading="isListLoading"
        standout
        dense
        debounce="300"
        stack-label
        dark
      >
        <template #prepend>
          <q-icon :name="iconSearch" />
        </template>
        <template #after>
          <subscribe-button :origin-code="originCode" />
        </template>
      </q-input>

      <destination-group
        class="q-mt-xs"
        :loading="isListLoading"
        :destinations="destinations"
        :countries="countries"
      />
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { matSearch as iconSearch } from '@quasar/extras/material-icons'
import { defineComponent, toRef, watch } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import SearchTabs from '@/front/src/pages/country/components/search-tabs.vue'
import SubscribeButton from '@/front/src/pages/country/components/subscribe-button.vue'
import {
  getBreadcrumbs,
  useGroupedDestinations,
  useCountries,
  useRestrictionFilterer,
} from '@/front/src/pages/country/composable'
import { useStore } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: {
    SubscribeButton,
    SearchTabs,
    TheBreadcrumbs,
    DestinationGroup,
    Portal,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const originCode = toRef(props, 'originCode')
    const { countries, isLoading: isCountryListLoading } = useCountries()
    const {
      destinationsRef,
      isLoadingRef: isDestinationListLoading,
    } = useGroupedDestinations(originCode)

    watch(isDestinationListLoading, (newValue) => {
      useStore().commit('setCountrySelectorLoading', newValue)
    })

    const {
      countryMatchFilterValue,
      tabFilterValue,
      destinations,
    } = useRestrictionFilterer(destinationsRef)

    return {
      countries,
      tabFilterValue,
      countryMatchFilterValue,
      isListLoading: useAggregatedLoader(
        isCountryListLoading,
        isDestinationListLoading,
      ),
      destinations,
      iconSearch,
      breadcrumbs: getBreadcrumbs(originCode, isDestinationListLoading),
    }
  },
})
</script>
