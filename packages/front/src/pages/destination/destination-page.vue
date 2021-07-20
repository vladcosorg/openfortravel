<template>
  <inner-page disable-container disable-margins>
    <the-breadcrumbs :items="breadcrumbs" />
    <div class="overflow-auto q-pb-lg q-pt-md relative-position bg-elevation-1">
      <div class="container">
        <the-heading />
      </div>
    </div>
    <the-profile-bar />
    <q-separator color="elevation-1" />
    <div class="container q-mt-xl">
      <div class="row q-col-gutter-xl">
        <div class="col-md-6 col-12">
          <entry-restrictions />
        </div>
        <div class="col-md-6 col-12">
          <entry-restrictions return-restrictions />
        </div>
      </div>
      <q-separator class="q-my-xl" />
      <div class="row q-col-gutter-xl">
        <div class="col-md-4 col-12">
          <stats class="q-mb-xl" :is-loading="isLoading" />
        </div>
        <div class="col-md-4 col-12">
          <links
            class="q-mb-xl"
            :destination="destination"
            :is-loading="isLoading"
          />
        </div>
        <div class="col-md-4 col-12">
          <links
            class="q-mb-xl"
            :destination="destination"
            :is-loading="isLoading"
          />
        </div>
      </div>

      <!--      <questions-->
      <!--        class="q-my-xl"-->
      <!--        :is-loading="isLoading"-->
      <!--        :destination="destination"-->
      <!--        :restriction="restriction"-->
      <!--      />-->
      <section>
        <!--        <widget-header :title="$t('components.sharing.title')" />-->
        <!--        <sharing :restriction="restriction" />-->
      </section>
      <the-related-criteria-section />
    </div>
  </inner-page>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'
import { useStore } from 'vuex'

import InnerPage from '@/front/src/components/inner-page.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import EntryRestrictions from '@/front/src/pages/destination/components/entry-restrictions.vue'
import Links from '@/front/src/pages/destination/components/links.vue'
import TheRelatedCriteriaSection from '@/front/src/pages/destination/components/sections/the-related-criteria-section.vue'
import Stats from '@/front/src/pages/destination/components/stats.vue'
import TheHeading from '@/front/src/pages/destination/components/the-heading.vue'
import TheProfileBar from '@/front/src/pages/destination/components/the-profile-bar/the-profile-bar.vue'
import { useBreadcrumbs } from '@/front/src/pages/destination/destination-composable'
import { registerStoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: {
    TheRelatedCriteriaSection,
    Links,
    Stats,
    EntryRestrictions,
    TheProfileBar,
    TheHeading,
    TheBreadcrumbs,
    InnerPage,
  },
  setup() {
    const store = registerStoreModule(useStore())

    const { loading } = useLoading(false)
    const breadcrumbs = useBreadcrumbs(
      computed(() => store.getters.currentOriginCode),
      computed(() => store.getters.currentDestinationCode),
    )
    provide(StoreKey, store)

    return {
      destination: computed(() => store.getters.destination),
      isLoading: loading,
      breadcrumbs,
    }
  },
})
</script>
