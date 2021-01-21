<template>
  <inner-page disable-container disable-margins>
    <portal to="under-header">
      <the-breadcrumbs
        :origin-slug="restriction.originSlug"
        :items="breadcrumbs"
        :loading="loading"
      />
    </portal>
    <the-search-header
      :origin-code="originCode"
      :destination-code="destinationCode"
    />
    <div class="container">
      <div class="row q-col-gutter-xl">
        <div class="col-md col-12">
          <description
            class="text-subtitle1 text-sm-left text-center q-mb-lg"
            :restriction="restriction"
            :loading="loading"
          />
          <property-list
            class="q-mx-xs-sm q-mx-none"
            :destination="destination"
            :restriction="restriction"
            :loading="loading"
          />
        </div>
        <div class="col-md col-12">
          <div class="q-pb-xl">
            <h4 class="q-mb-md">{{ $t('page.destination.returnWay') }}</h4>
            <return-way
              compact
              :origin-code="destinationCode"
              :destination-code="originCode"
            />
          </div>
          <section>
            <inline-subscribe-form no-autofocus :restriction="restriction" />
          </section>
        </div>
      </div>
    </div>
  </inner-page>
</template>

<script lang="ts">
import { matFlightLand, matFlightTakeoff } from '@quasar/extras/material-icons'
import { computed, defineComponent } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import TheSearchHeader from '@/front/src/layouts/components/the-search-header.vue'
import Description from '@/front/src/pages/destination/components/description.vue'
import InlineSubscribeForm from '@/front/src/pages/destination/components/inline-subscribe-form.vue'
import PropertyList from '@/front/src/pages/destination/components/property-list.vue'
import ReturnWay from '@/front/src/pages/destination/components/return-way.vue'
import {
  getDestination,
  getRestriction,
} from '@/front/src/pages/destination/destination-composable'
import { meta } from '@/front/src/pages/destination/destination-meta'
import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  meta,
  components: {
    TheSearchHeader,
    TheBreadcrumbs,
    Description,
    PropertyList,
    InnerPage,
    InlineSubscribeForm,
    ReturnWay,
    Portal,
  },
  props: {
    unsafeOriginCode: {
      type: String,
      default: undefined,
    },
    unsafeDestinationCode: {
      type: String,
      default: undefined,
    },
    isFallback: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const originCodeRef = useComputedMemorized(() => props.unsafeOriginCode)
    const destinationCodeRef = useComputedMemorized(
      () => props.unsafeDestinationCode,
    )
    const {
      restrictionRef,
      loadingRef: restrictionLoadingRef,
    } = getRestriction(originCodeRef, destinationCodeRef)
    const {
      destinationRef,
      loadingRef: destinationLoadingRef,
    } = getDestination(destinationCodeRef)

    const breadcrumbs = computed(() => [
      {
        label: `Destinations from ${restrictionRef.value.originLabel}`,
        to: {
          name: 'origin',
          params: {
            originSlug: restrictionRef.value.originSlug,
          },
        },
        icon: matFlightTakeoff,
      },
      {
        label: `Travel to ${restrictionRef.value.destinationLabel}`,
        icon: matFlightLand,
      },
    ])
    return {
      originCode: originCodeRef,
      destinationCode: destinationCodeRef,
      restriction: restrictionRef,
      destination: destinationRef,
      loading: useAggregatedLoader(
        restrictionLoadingRef,
        destinationLoadingRef,
      ),
      breadcrumbs,
    }
  },
})
</script>
