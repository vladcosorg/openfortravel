<template>
  <div class="container">
    <div class="justify-center q-col-gutter-lg">
      <the-search-stats />
      <div class="row q-gutter-x-md q-mb-lg">
        <input-filter
          v-model="countryMatchFilterValue"
          class="col-4"
          :is-loading="isListLoading"
          :origin-code="originCode"
        />
        <!--        <generic-select label="Sort by" dense :value="[]" />-->
      </div>
      <destination-group
        v-if="isFiltering"
        :loading="isListLoading"
        :destinations="filteredDestinations"
      />
      <div v-else class="q-col-gutter-md">
        <div class="text-h5" style="font-weight: normal">
          Countries impose
          <span class="text-positive">no restrictions</span> for travel from
          <origin-context-inline />
          <div class="text-subtitle1">
            for citizens, nationals and residents of
            <citizenship-context-inline /> that are
            <vaccination-context-inline />
          </div>
        </div>

        <destination-group
          :loading="isListLoading"
          :destinations="groupedDestinations.open"
        />

        <div class="text-h5" style="font-weight: normal">
          Countries that require
          <span class="text-warning">COVID test</span> for travel from
          <origin-context-inline />
          <div class="text-subtitle1">
            for citizens, nationals and residents of
            <citizenship-context-inline /> that are
            <vaccination-context-inline />
          </div>
        </div>

        <destination-group
          :loading="isListLoading"
          :destinations="groupedDestinations.test"
        />

        <div class="text-h5" style="font-weight: normal">
          Countries that require
          <span class="text-negative">quarantine</span> upon entry for travel
          from
          <origin-context-inline />
          <div class="text-subtitle1">
            for citizens, nationals and residents of
            <citizenship-context-inline /> that are
            <vaccination-context-inline />
          </div>
        </div>

        <destination-group
          :loading="isListLoading"
          :destinations="groupedDestinations.quarantine"
        />

        <div class="text-h5" style="font-weight: normal">
          Countries currently
          <span class="text-negative text-bold">closed</span> for travel from
          <origin-context-inline />
          <div class="text-subtitle1">
            for citizens, nationals and residents of
            <citizenship-context-inline /> that are
            <vaccination-context-inline />
          </div>
        </div>

        <destination-group
          :loading="isListLoading"
          :destinations="groupedDestinations.forbidden"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import CitizenshipContextInline from '@/front/src/components/context-field/citizenship/citizenship-context-inline.vue'
import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import VaccinationContextInline from '@/front/src/components/context-field/vaccination/vaccination-context-inline.vue'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import InputFilter from '@/front/src/pages/country/components/input-filter.vue'
import TheSearchStats from '@/front/src/pages/country/components/the-search-stats.vue'
import { useRestrictionFilterer } from '@/front/src/pages/country/composable'
import { useCountryStore } from '@/front/src/pages/country/pinia-store'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: {
    TheSearchStats,
    VaccinationContextInline,
    CitizenshipContextInline,
    OriginContextInline,
    InputFilter,
    DestinationGroup,
  },

  setup() {
    const countryStore = useCountryStore()
    const allDestinations = computed(() => countryStore.searchResults)
    const originCode = computed(() => useRootStore().getters.visitorOrigin)
    const { loading: isLoading } = useLoading(false)
    const groupedDestinations = computed(() => countryStore.groupedResults)
    const { countryMatchFilterValue, destinations: filteredDestinations } =
      useRestrictionFilterer(allDestinations)
    const isFiltering = computed(() => countryMatchFilterValue.value.length > 0)

    return {
      originCode,
      groupedDestinations,
      isFiltering,
      filteredDestinations,
      countryMatchFilterValue,
      isListLoading: isLoading,
    }
  },
})
</script>
