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
      <questions class="q-my-xl col-8" :is-loading="isLoading" />
      <q-separator class="q-my-xl" />
      <div class="row q-col-gutter-xl">
        <div class="col-md-4 col-12">
          <stats
            class="q-mb-xl"
            :is-loading="isLoading"
            :country-factsheet="destination"
          />
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

      <section>
        <!--        <widget-header :title="$t('components.sharing.title')" />-->
        <!--        <sharing :restriction="restriction" />-->
      </section>
      <the-related-criteria-section />
    </div>
  </inner-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  provide,
  onServerPrefetch,
  onBeforeMount,
  watch,
} from 'vue'
import { useStore } from 'vuex'

import InnerPage from '@/front/src/components/inner-page.vue'
import { useContextParser } from '@/front/src/composables/visitor-context-applier'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import EntryRestrictions from '@/front/src/pages/destination/components/entry-restrictions.vue'
import Links from '@/front/src/pages/destination/components/links.vue'
import Questions from '@/front/src/pages/destination/components/sections/questions/questions.vue'
import TheRelatedCriteriaSection from '@/front/src/pages/destination/components/sections/the-related-criteria-section.vue'
import Stats from '@/front/src/pages/destination/components/stats.vue'
import TheHeading from '@/front/src/pages/destination/components/the-heading.vue'
import TheProfileBar from '@/front/src/pages/destination/components/the-profile-bar/the-profile-bar.vue'
import { useBreadcrumbs } from '@/front/src/pages/destination/destination-composable'
import { useDestinationMeta } from '@/front/src/pages/destination/destination-meta'
import { registerStoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { destinationParameterTransformers } from '@/front/src/router/route-builders/destination'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  components: {
    Questions,
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
    const originCode = computed(() => store.getters.currentOriginCode)
    const destinationCode = computed(() => store.getters.currentDestinationCode)

    onServerPrefetch(async () => {
      await store.actions.fetchAll()
    })
    onBeforeMount(() => store.actions.fetchAll())
    watch([originCode, destinationCode], () => store.actions.fetchAll())

    provide(StoreKey, store)

    const { loading } = useLoading(false)
    const breadcrumbs = useBreadcrumbs(originCode, destinationCode)

    useDestinationMeta(store)

    return {
      origin: computed(() => store.getters.originFactsheet),
      destination: computed(() => store.getters.destinationFactsheet),
      isLoading: loading,
      breadcrumbs,
    }
  },
})
</script>
