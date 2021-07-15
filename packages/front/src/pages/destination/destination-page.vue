<template>
  <inner-page disable-container disable-margins>
    <portal to="under-header">
      <the-breadcrumbs :items="breadcrumbs" />
    </portal>
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
import {
  computed,
  defineComponent,
  PropType,
  provide,
  toRef,
  watch,
} from '@vue/composition-api'
import { Portal } from 'portal-vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import { applyContextFromProps } from '@/front/src/composables/visitor-context-applier'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import EntryRestrictions from '@/front/src/pages/destination/components/entry-restrictions.vue'
import Links from '@/front/src/pages/destination/components/links.vue'
import TheRelatedCriteriaSection from '@/front/src/pages/destination/components/sections/the-related-criteria-section.vue'
import Stats from '@/front/src/pages/destination/components/stats.vue'
import TheHeading from '@/front/src/pages/destination/components/the-heading.vue'
import TheProfileBar from '@/front/src/pages/destination/components/the-profile-bar/the-profile-bar.vue'
import { useBreadcrumbs } from '@/front/src/pages/destination/destination-composable'
import { meta } from '@/front/src/pages/destination/destination-meta'
import { registerStoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useStore } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

export default defineComponent({
  meta,
  components: {
    TheRelatedCriteriaSection,
    TheProfileBar,
    TheHeading,
    EntryRestrictions,
    Stats,
    Links,
    TheBreadcrumbs,
    InnerPage,
    Portal,
  },
  inheritAttrs: false,
  props: {
    destinationSlug: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    originSlug: {
      type: String as PropType<VisitorProfile[RestrictionNodeType.ORIGIN]>,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    citizenship: {
      type: Array as PropType<VisitorProfile[RestrictionNodeType.CITIZENSHIP]>,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    vaccinated: {
      type: Object as PropType<VisitorProfile[RestrictionNodeType.VACCINATED]>,
    },
    // eslint-disable-next-line vue/no-unused-properties
    isFallback: {
      type: Boolean,
    },
  },
  setup(props) {
    const store = registerStoreModule(useStore(), {
      currentDestinationCode: props.destinationSlug,
    })

    const { loading } = useLoading(false)

    provide(StoreKey, store)
    watch(
      props,
      () => {
        applyContextFromProps(props)
        store.mutations.setCurrentDestinationIso(props.destinationSlug)
      },
      { immediate: true },
    )

    return {
      destination: computed(() => store.getters.destination),
      isLoading: loading,
      breadcrumbs: useBreadcrumbs(
        computed(() => store.getters.currentOriginCode),
        toRef(props, 'destinationSlug'),
      ),
    }
  },
})
</script>
