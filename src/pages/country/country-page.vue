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
              <q-item-label>
                {{ stats[status] }}
                {{ $tc('page.country.stats.country', stats[status]) }}:
                {{ $t('page.country.stats.values')[status] }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <q-input
        v-model="destinationFilter"
        autofocus
        :placeholder="$t('page.country.quickSearch')"
        :loading="filterLoading"
        :disable="loading"
        dense
        outlined
        stack-label
        dark
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list v-if="loading || filterLoading" separator>
        <q-item v-for="n in Array(4)" :key="n">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else>
        <destination-group
          v-for="(statusLabel, status) in statuses"
          :key="status"
          :group-name="statusLabel"
          :group-icon="statusIcon[status]"
          :group-color="statusColors[status]"
          :destinations="destinations[status]"
        />
      </div>
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
import TheCountryList from 'src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from 'src/layouts/components/the-flag-background.vue'
import DestinationGroup from 'src/pages/country/components/destination-group.vue'
import { useGroupedDestinations } from 'src/pages/country/composable'

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

    const {
      destinations,
      filter: destinationFilter,
      loading,
      filterLoading,
    } = useGroupedDestinations(originCode)

    watch(loading, (newValue) => {
      useStore().commit('setCountrySelectorLoading', newValue)
    })

    return {
      destinationFilter,
      destinations,
      loading,
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
        return getStatusMapper((status) => destinations.value[status]?.length)
      }),
      filterLoading,
    }
  },
})
</script>
