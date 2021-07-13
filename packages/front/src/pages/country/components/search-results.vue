<template>
  <div class="container">
    <portal to="under-header">
      <the-breadcrumbs
        :items="breadcrumbs.items"
        :loading="breadcrumbs.loading"
      />
    </portal>
    <div class="justify-center q-col-gutter-md">
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
          Countries currently <span class="text-positive">open</span> for travel
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
          :destinations="allowedDestinations"
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
          :destinations="forbiddenDestinations"
          :collapse-after="3"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import CitizenshipContextInline from '@/front/src/components/context-field/citizenship/citizenship-context-inline.vue'
import GenericSelect from '@/front/src/components/context-field/helpers/generic-select.vue'
import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import VaccinationContextInline from '@/front/src/components/context-field/vaccination/vaccination-context-inline.vue'
import CitizenshipStatus from '@/front/src/components/context-value/citizenship-status.vue'
import OriginStatus from '@/front/src/components/context-value/origin-status.vue'
import VaccinationStatus from '@/front/src/components/context-value/vaccination-status.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import InputFilter from '@/front/src/pages/country/components/input-filter.vue'
import {
  getBreadcrumbs,
  useRestrictionFilterer,
  useRestrictionList,
} from '@/front/src/pages/country/composable'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: {
    VaccinationContextInline,
    CitizenshipContextInline,
    OriginContextInline,
    CountryLabel,
    OriginStatus,
    CitizenshipStatus,
    VaccinationStatus,
    GenericSelect,
    InputFilter,
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
    const { loading: isLoading } = useLoading(false)
    const { allowedDestinations, forbiddenDestinations, allDestinations } =
      useRestrictionList()
    const { countryMatchFilterValue, destinations: filteredDestinations } =
      useRestrictionFilterer(allDestinations)

    const isFiltering = computed(() => countryMatchFilterValue.value.length > 0)

    return {
      isFiltering,
      filteredDestinations,
      countryMatchFilterValue,
      isListLoading: isLoading,
      breadcrumbs: getBreadcrumbs(originCode, isLoading),
      allowedDestinations,
      forbiddenDestinations,
    }
  },
})
</script>
