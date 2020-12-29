<template>
  <q-page>
    <portal to="top">
      <the-flag-background :first-country-code="originCode" />
    </portal>
    <the-country-list :origin-code="originCode" class="q-mb-md" />

    <div class="column justify-center q-gutter-md">
      <div class="text-h6 text-center text-uppercase">
        {{ $t('page.country.destinations') }}
      </div>
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
            text-color="primary"
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
        :loading="isListLoading"
        :destinations="filteredFlatDestinations"
        :countries="countries"
      />
    </div>
    <q-list dense bordered separator padding class="rounded-borders">
      <q-item-label header>{{ $t('page.country.stats.header') }}</q-item-label>

      <q-item
        v-for="(statusLabel, status) in statuses"
        :key="status"
        :class="`text-${statusColors[status]}`"
      >
        <q-item-section>
          <q-item-label v-if="isListLoading">
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
  </q-page>
</template>

<script lang="ts">
import {
  matSearch as iconSearch,
  matNotificationsNone as iconSubscribe,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from '@/front/src/layouts/components/the-flag-background.vue'
import { generateCanonicalBlock } from '@/front/src/misc/meta'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import DialogSubscribeForm from '@/front/src/pages/country/components/dialog-subscribe-form.vue'
import {
  useCountries,
  useFilterableFlatDestinations,
  useGroupedDestinations,
} from '@/front/src/pages/country/composable'
import {
  getStatusListMap,
  getStatusMapper,
} from '@/shared/src/api/restrictions/helper'
import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'
import { useStore, useI18n } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'
import {
  getLabelForCountryCode,
  transformCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  meta({
    originCode,
    isFallback,
  }: {
    originCode: string
    isFallback: boolean
  }) {
    return {
      title: useI18n().t('page.country.meta.title', {
        origin: getLabelForCountryCode(originCode),
      }),
      link: {
        ...(isFallback && {
          canonical: generateCanonicalBlock({
            name: 'origin',
            params: {
              originSlug: transformCodeToOriginSlug(originCode),
            },
          }),
        }),
      },
    }
  },
  components: {
    DialogSubscribeForm,
    TheCountryList,
    DestinationGroup,
    Portal,
    TheFlagBackground,
  },
  props: {
    unsafeOriginCode: {
      type: String,
    },
    isFallback: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const originCodeRef = useComputedMemorized(() => props.unsafeOriginCode)

    const { countries, isLoading: isCountryListLoading } = useCountries()
    const {
      destinationsRef,
      isLoadingRef: isDestinationListLoading,
    } = useGroupedDestinations(originCodeRef)
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
      originCode: originCodeRef,
      filter: filterRef,
      isListLoading: useAggregatedLoader(
        filterLoadingRef,
        isDestinationListLoading,
        isCountryListLoading,
      ),
      filteredFlatDestinations: filteredDestinationsRef,
      statuses: getStatusListMap(),
      statusColors: {
        allowed: 'positive',
        conditional: 'warning',
        forbidden: 'negative',
      },
      stats: computed(() =>
        getStatusMapper(
          (status) =>
            destinationsRef.value.filter(
              (destination) => destination.status === status,
            ).length,
        ),
      ),
      promptVisible: ref(false),
      iconSearch,
      iconSubscribe,
    }
  },
})
</script>
