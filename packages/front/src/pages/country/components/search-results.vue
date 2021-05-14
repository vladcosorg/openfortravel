<template>
  <div class="container">
    <portal to="under-header">
      <the-breadcrumbs
        :items="breadcrumbs.items"
        :loading="breadcrumbs.loading"
      />
    </portal>
    <div class="justify-center q-gutter-lg">
      <div class="text-h6 text-center text-uppercase">
        {{ $t('page.country.destinations') }}
      </div>
      <search-tabs v-model="tabFilterValue" :origin-code="originCode" />
      <input-filter
        v-model="countryMatchFilterValue"
        :is-loading="isListLoading"
        :origin-code="originCode"
      />
      <destination-group
        v-if="countryMatchFilterValue || isListLoading"
        class="q-mt-lg"
        :loading="isListLoading"
        :destinations="destinations"
      />
      <destination-group
        v-for="(status, id) in statuses"
        v-else
        :key="id"
        :group-name="status"
        class="q-mt-lg"
        :loading="isListLoading"
        :destinations="groupedRestrictionList[status]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import DestinationGroup from '@/front/src/pages/country/components/destination-group.vue'
import InputFilter from '@/front/src/pages/country/components/input-filter.vue'
import SearchTabs from '@/front/src/pages/country/components/search-tabs.vue'
import {
  getBreadcrumbs,
  useCountries,
  useRestrictionFilterer,
  useRestrictionList,
} from '@/front/src/pages/country/composable'
import { getStatusList } from '@/shared/src/api/restrictions/helper'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

const statuses = getStatusList()
export default defineComponent({
  components: {
    InputFilter,
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
    const { loading: isLoading } = useLoading(false)
    const { countries } = useCountries()
    const { flatRestrictionList, groupedRestrictionList } = useRestrictionList(
      countries,
    )
    const {
      countryMatchFilterValue,
      tabFilterValue,
      destinations,
    } = useRestrictionFilterer(flatRestrictionList)

    return {
      countries,
      tabFilterValue,
      countryMatchFilterValue,
      isListLoading: isLoading,
      destinations,
      groupedRestrictionList,
      breadcrumbs: getBreadcrumbs(originCode, isLoading),
      statuses,
    }
  },
})
</script>
