<template>
  <q-page>
    <portal to="top">
      <the-flag-background :first-country-code="originCode" />
    </portal>
    <the-country-list :origin-code="originCode" class="q-mb-md" />

    <div class="column justify-center q-gutter-md">
      <div class="text-h6 text-center text-uppercase">Destinations</div>
      <q-input
        v-model="filter"
        :placeholder="$t('page.country.quickSearch')"
        :loading="isFilteredListLoading"
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
            Subscribe
          </q-btn>
        </template>
      </q-input>
      <the-subscribe-form
        v-if="promptVisible"
        v-model="promptVisible"
        :origin="originCode"
      />

      <destination-group
        v-if="isFiltering"
        :loading="isFilteredListLoading"
        :show-header="false"
        :destinations="filteredFlatDestinations"
      />
      <destination-group
        v-for="(destinations, status) in groupedDestinations"
        v-else
        :key="status"
        :show-header="false"
        :loading="isGroupedListLoading"
        :group-name="$t('status')[status]"
        :group-icon="statusIcon[status]"
        :group-color="statusColors[status]"
        :destinations="destinations"
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
  </q-page>
</template>

<script lang="ts">
import {
  ionAlertCircleOutline as conditionalIcon,
  ionCheckmarkCircleOutline as allowedIcon,
  ionCloseCircleOutline as forbiddenIcon,
} from '@quasar/extras/ionicons-v5'
import {
  matSearch as iconSearch,
  matNotificationsNone as iconSubscribe,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'
import { useStore } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'
import {
  getLabelForCountryCode,
  transformCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'
import { getStatusListMap, getStatusMapper } from '@/front/src/api/restrictions/helper'
import { useI18n } from '@/front/src/composables/use-plugins'
import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from '@/front/src/layouts/components/the-flag-background.vue'
import TheSubscribeForm from '@/front/src/layouts/components/the-subscribe-form.vue'
import { generateCanonicalBlock } from '@/front/src/misc/meta'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import {
  useFilterableFlatDestinations,
  useGroupedDestinations,
} from '@/front/src/pages/country/composable'

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
    TheSubscribeForm,
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

    const { destinationsRef, isLoadingRef } = useGroupedDestinations(
      originCodeRef,
    )
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
      originCode: originCodeRef,
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
      stats: computed(() =>
        getStatusMapper((status) => destinationsRef.value[status]?.length),
      ),
      promptVisible: ref(false),
      iconSearch,
      iconSubscribe,
    }
  },
})
</script>
