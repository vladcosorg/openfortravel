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
          <section class="q-pb-xl">
            <inline-subscribe-form no-autofocus :restriction="restriction" />
          </section>
          <section class="bg-elevation-1 rounded-borders q-pa-lg">
            <div class="text-h6">
              {{ $t('page.destination.widgets.info.title') }}
            </div>
            <div class="text-body2 text-grey-5 q-mb-md">
              {{ $t('page.destination.widgets.info.subtitle') }}
            </div>
            <div v-if="destination.linkList.length === 0">
              {{ $t('page.destination.widgets.info.none') }}
            </div>
            <a
              v-for="(link, index) in destination.linkList"
              v-else
              :key="index"
              target="_blank"
              class="block"
              :href="link"
            >
              {{ link }}
            </a>
          </section>
        </div>
      </div>
      <questions
        class="q-mt-xl"
        :is-loading="loading"
        :destination="destination"
        :restriction="restriction"
      />
    </div>
  </inner-page>
</template>

<script lang="ts">
import { matFlightLand, matFlightTakeoff } from '@quasar/extras/material-icons'
import { computed, defineComponent, toRefs } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import InnerPage from '@/front/src/components/inner-page.vue'
import TheBreadcrumbs from '@/front/src/layouts/components/the-header/the-breadcrumbs.vue'
import TheSearchHeader from '@/front/src/layouts/components/the-search-header.vue'
import Description from '@/front/src/pages/destination/components/description.vue'
import InlineSubscribeForm from '@/front/src/pages/destination/components/inline-subscribe-form.vue'
import PropertyList from '@/front/src/pages/destination/components/property-list.vue'
import Questions from '@/front/src/pages/destination/components/questions.vue'
import ReturnWay from '@/front/src/pages/destination/components/return-way.vue'
import {
  getDestination,
  getRestriction,
} from '@/front/src/pages/destination/destination-composable'
import { meta } from '@/front/src/pages/destination/destination-meta'
import { useVueI18n } from '@/shared/src/composables/use-plugins'
import { useAggregatedLoader } from '@/shared/src/composables/use-promise-loading'

export default defineComponent({
  meta,
  components: {
    Questions,
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
    const { t } = useVueI18n()
    const { originCode, destinationCode } = toRefs(props)

    const {
      restrictionRef,
      loadingRef: restrictionLoadingRef,
    } = getRestriction(originCode, destinationCode)
    const {
      destinationRef,
      loadingRef: destinationLoadingRef,
    } = getDestination(destinationCode)

    const breadcrumbs = computed(() => [
      {
        label: t('page.country.breadcrumb', {
          country: restrictionRef.value.originLabel,
        }),
        to: {
          name: 'origin',
          params: {
            originSlug: restrictionRef.value.originSlug,
          },
        },
        icon: matFlightTakeoff,
      },
      {
        label: t('page.destination.breadcrumb', {
          country: restrictionRef.value.destinationLabel,
        }),
        icon: matFlightLand,
      },
    ])
    return {
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
