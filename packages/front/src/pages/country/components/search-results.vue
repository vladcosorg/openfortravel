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
      <search-tabs v-model="currentTab" :origin-code="originCode" />
      <q-input
        v-model="filter"
        :placeholder="$t('page.country.quickSearch')"
        :loading="isListLoading"
        standout
        dense
        stack-label
        dark
      >
        <template #prepend>
          <q-icon :name="iconSearch" />
        </template>
        <template #after>
          <q-btn
            :icon="iconSubscribe"
            class="full-height"
            type="submit"
            unelevated
            color="secondary"
            text-color="dark"
            @click="promptVisible = true"
          >
            {{ $t('components.subscribe.action') }}
          </q-btn>
        </template>
      </q-input>
      <dialog-subscribe-form
        v-if="promptVisible"
        v-model="promptVisible"
        :origin="originCode"
      />

      <destination-group
        class="q-mt-xs"
        :loading="isListLoading"
        :destinations="filteredFlatDestinations"
        :countries="countries"
      />
    </div>
  </div>
</template>

<style lang="scss" module></style>

<script lang="ts">
import {
  matNotificationsNone as iconSubscribe,
  matSearch as iconSearch,
} from '@quasar/extras/material-icons'
import { defineComponent, ref, toRef, watch } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import DialogSubscribeForm from '@/front/src/pages/country/components/dialog-subscribe-form.vue'
import SearchTabs from '@/front/src/pages/country/components/search-tabs.vue'
import {
  getBreadcrumbs,
  useFilterableFlatDestinations,
  useGroupedDestinations,
  useCountries,
} from '@/front/src/pages/country/composable'
import { useStore } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: {
    SearchTabs,
    TheBreadcrumbs,
    DialogSubscribeForm,
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
    const currentTab = ref('')
    const { countries, isLoading: isCountryListLoading } = useCountries()
    const {
      destinationsRef,
      isLoadingRef: isDestinationListLoading,
    } = useGroupedDestinations(originCode)
    const {
      filterRef,
      filteredDestinationsRef,
      filterLoadingRef,
    } = useFilterableFlatDestinations(destinationsRef)

    watch(isDestinationListLoading, (newValue) => {
      useStore().commit('setCountrySelectorLoading', newValue)
    })

    return {
      countries,
      currentTab,
      filter: filterRef,
      isListLoading: useAggregatedLoader(
        filterLoadingRef,
        isCountryListLoading,
        isDestinationListLoading,
      ),
      filteredFlatDestinations: filteredDestinationsRef,
      promptVisible: ref(false),
      iconSearch,
      iconSubscribe,
      breadcrumbs: getBreadcrumbs(originCode, isDestinationListLoading),
    }
  },
})
</script>
