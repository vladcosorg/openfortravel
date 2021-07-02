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
    </div>
  </inner-page>
</template>

<script lang="ts">
import { matBadge as badgeIcon } from '@quasar/extras/material-icons'
import {
  computed,
  defineComponent,
  onMounted,
  onServerPrefetch,
  provide,
  toRefs,
  watch,
} from '@vue/composition-api'
import { Portal } from 'portal-vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import TheSearchHeader from '@/front/src/layouts/components/the-search-header.vue'
import EntryRestrictions from '@/front/src/pages/destination/components/entry-restrictions.vue'
import InlineSubscribeForm from '@/front/src/pages/destination/components/inline-subscribe-form.vue'
import Links from '@/front/src/pages/destination/components/links.vue'
import Stats from '@/front/src/pages/destination/components/stats.vue'
import TheHeading from '@/front/src/pages/destination/components/the-heading.vue'
import TheProfileBar from '@/front/src/pages/destination/components/the-profile-bar/the-profile-bar.vue'
import { useBreadcrumbs } from '@/front/src/pages/destination/destination-composable'
import { meta } from '@/front/src/pages/destination/destination-meta'
import { registerStoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useStore } from '@/shared/src/composables/use-plugins'
import { useLoading } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  meta,
  components: {
    TheProfileBar,
    TheSearchHeader,
    TheHeading,
    EntryRestrictions,
    Stats,
    Links,
    TheBreadcrumbs,
    InnerPage,
    InlineSubscribeForm,
    Portal,
  },
  props: {
    originCode: {
      type: String,
      required: true,
    },
    destinationCode: {
      type: String,
      required: true,
    },
    isFallback: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = registerStoreModule(useStore(), {
      currentOriginCode: props.originCode,
      currentDestinationCode: props.destinationCode,
    })
    const { originCode, destinationCode } = toRefs(props)
    const { loading } = useLoading(false)

    const init = () => {
      store.mutations.setCurrentCountryPair({
        originCode: props.originCode,
        destinationCode: props.destinationCode,
      })
    }

    provide(StoreKey, store)
    onMounted(init)
    onServerPrefetch(init)
    watch(props, init)

    return {
      destination: computed(() => store.getters.destination),
      isLoading: loading,
      breadcrumbs: useBreadcrumbs(originCode, destinationCode),
      badgeIcon,
    }
  },
})
</script>
