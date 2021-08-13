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
            :destination="origin"
            :is-loading="isLoading"
          />
        </div>
        <div class="col-md-4 col-12">
          <links
            class="q-mb-xl"
            :destination="destination"
            :is-loading="isLoading"
            return-direction
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
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import { computed, defineComponent, provide } from 'vue'
import { useStore } from 'vuex'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import EntryRestrictions from '@/front/src/pages/destination/components/entry-restrictions.vue'
import Links from '@/front/src/pages/destination/components/links.vue'
import TheRelatedCriteriaSection from '@/front/src/pages/destination/components/sections/the-related-criteria-section.vue'
import Stats from '@/front/src/pages/destination/components/stats.vue'
import TheHeading from '@/front/src/pages/destination/components/the-heading.vue'
import TheProfileBar from '@/front/src/pages/destination/components/the-profile-bar/the-profile-bar.vue'
import { useBreadcrumbs } from '@/front/src/pages/destination/destination-composable'
import { useDestinationMeta } from '@/front/src/pages/destination/destination-meta'
import { registerStoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'

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
    useContextParser(destinationParameterTransformers)

    const store = registerStoreModule(useStore())
    provide(StoreKey, store)

    const { loading } = useLoading(false)
    const breadcrumbs = useBreadcrumbs(
      computed(() => store.getters.currentOriginCode),
      computed(() => store.getters.currentDestinationCode),
    )

    useDestinationMeta(store)

    return {
      origin: computed(() => store.getters.origin),
      destination: computed(() => store.getters.destination),
      isLoading: loading,
      breadcrumbs,
    }
  },
})
</script>
