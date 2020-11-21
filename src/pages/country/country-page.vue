<template>
  <q-page class="q-px-md q-py-xl">
    <portal to="top">
      <the-flag-background :first-country-code="originCode" />
    </portal>

    <the-country-list :origin-code="originCode" class="q-mb-xl" />

    <div class="column justify-center q-gutter-lg">
      <div>
        <div class="text-subtitle1"></div>
        <q-list dense bordered separator padding class="rounded-borders">
          <q-item-label header>{{
            $t('page.country.stats.header')
          }}</q-item-label>

          <q-item
            v-for="(statusLabel, status) in statuses"
            :key="status"
            :class="`text-${statusColors[status]}`"
          >
            <q-item-section>
              <q-item-label v-if="isGroupedListLoading">
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label v-else>
                {{ stats[status] }}
                {{ $tc('page.country.stats.country', stats[status]) }}:
                {{ $t('page.country.stats.values')[status] }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-input
        v-model="filter"
        autofocus
        :placeholder="$t('page.country.quickSearch')"
        :loading="isFilteredListLoading"
        dense
        outlined
        stack-label
        dark
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <destination-group
        v-if="isFiltering || isListLoading"
        :loading="isListLoading"
        :show-header="false"
        :destinations="filteredFlatDestinations"
      />
      <destination-group
        v-for="(destinations, status) in groupedDestinations"
        v-else
        :key="status"
        :group-name="$t('status')[status]"
        :group-icon="statusIcon[status]"
        :group-color="statusColors[status]"
        :destinations="destinations"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  ionCheckmarkCircleOutline as allowedIcon,
  ionAlertCircleOutline as conditionalIcon,
  ionCloseCircleOutline as forbiddenIcon,
} from '@quasar/extras/ionicons-v5'
import { computed, defineComponent, toRefs, watch } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import { getStatusListMap, getStatusMapper } from 'src/api/restrictions/helper'
import { useStore } from 'src/composables/use-plugins'
import { useAggregatedLoader } from 'src/composables/use-promise-loading'
import TheCountryList from 'src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from 'src/layouts/components/the-flag-background.vue'
import DestinationGroup from 'src/pages/country/components/destination-group.vue'
import {
  useFilterableFlatDestinations,
  useGroupedDestinations,
} from 'src/pages/country/composable'

export default defineComponent({
  meta: {
    // sets document title
    title: 'is page',
  },
  components: { TheCountryList, DestinationGroup, Portal, TheFlagBackground },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { originCode } = toRefs(props)

    const { destinationsRef, isLoadingRef } = useGroupedDestinations(originCode)
    const {
      filterRef,
      filteredDestinationsRef,
      filterLoadingRef,
      isFilteringRef,
    } = useFilterableFlatDestinations(destinationsRef)

    watch(isLoadingRef, (newValue) => {
      useStore().commit('setCountrySelectorLoading', newValue)
    })

    return {
      filter: filterRef,
      isFiltering: isFilteringRef,
      isFilteredListLoading: filterLoadingRef,
      isGroupedListLoading: isLoadingRef,
      isListLoading: useAggregatedLoader(filterLoadingRef, isLoadingRef),
      groupedDestinations: destinationsRef,
      filteredFlatDestinations: filteredDestinationsRef,
      statuses: getStatusListMap(),
      statusIcon: {
        allowed: allowedIcon,
        conditional: conditionalIcon,
        forbidden: forbiddenIcon,
      },
      statusColors: {
        allowed: 'positive',
        conditional: 'warning',
        forbidden: 'negative',
      },
      stats: computed(() => {
        return getStatusMapper(
          (status) => destinationsRef.value[status]?.length,
        )
      }),
    }
  },
})
</script>
