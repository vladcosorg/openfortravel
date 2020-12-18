<template>
  <q-page>
    <portal to="top">
      <the-flag-background
        :first-country-code="originCode"
        :second-country-code="destinationCode"
      />
    </portal>
    <portal to="top-left">
      <q-btn
        unelevated
        color="primary"
        :icon="arrowBack"
        :loading="isGoingBack.state"
        :to="{
          name: 'origin',
          params: { originSlug: restriction.originSlug },
        }"
        @click="isGoingBack.toggle"
      />
    </portal>

    <the-country-list
      :origin-code="originCode"
      :destination-code="destinationCode"
      class="q-mb-xl"
    >
      <return-way
        compact
        :origin-code="destinationCode"
        :destination-code="originCode"
      />
    </the-country-list>

    <div v-if="loading" class="text-subtitle1 column flex-center">
      <q-skeleton type="text" width="100%" />
      <q-skeleton type="text" width="70%" />
      <q-skeleton type="text" width="95%" />
    </div>
    <div
      v-else
      class="text-subtitle1 text-center"
      v-html="restriction.description"
    />

    <q-list class="q-mt-md text-subtitle1">
      <template v-if="loading" #default>
        <q-item v-for="index in 5" :key="index">
          <q-item-section>
            <q-item-label caption>
              <q-skeleton type="text" width="20%" />
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text" width="40%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-else #default>
        <q-item v-ripple clickable>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.travel.label')
            }}</q-item-label>
            <q-item-label :class="['text-uppercase', `text-${statusColor}-6`]">
              {{ $t(`restriction.travel.value`)[restriction.status] }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.testing.label')
            }}</q-item-label>
            <q-item-label :class="[`text-${testingColor}-6`]">
              {{
                $t(`restriction.testing.value`)[restriction.testRequired]
              }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.insurance.label')
            }}</q-item-label>
            <q-item-label :class="[`text-${insuranceColor}-6`]">
              {{
                $t(`restriction.insurance.value`)[restriction.insuranceRequired]
              }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.healthDeclaration.label')
            }}</q-item-label>
            <q-item-label>
              {{
                $t(`restriction.healthDeclaration.value`)[
                  destination.isHealthDeclarationRequired
                ]
              }}
              <a
                v-if="destination.healthDeclarationDocURL"
                :href="destination.healthDeclarationDocURL"
                >{{ $t('page.destination.fillDeclaration') }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.selfIsolation.label')
            }}</q-item-label>
            <q-item-label v-if="restriction.selfIsolation > 0">
              {{
                $t('restriction.selfIsolation.days', {
                  days: restriction.selfIsolation,
                })
              }}</q-item-label
            >
            <q-item-label v-else>
              {{ $t('restriction.selfIsolation.staticValue.false') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>

    <q-btn
      class="q-mt-md full-width"
      color="accent"
      :icon="arrowBack"
      outline
      :label="$t('page.destination.backToList')"
      :loading="isGoingBack.state"
      align="left"
      :to="{
        name: 'origin',
        params: { originSlug: restriction.originSlug },
      }"
      @click="isGoingBack.toggle"
    />
  </q-page>
</template>

<script lang="ts">
import { matArrowBack as arrowBack } from '@quasar/extras/material-icons'
import { computed, defineComponent } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from '@/front/src/layouts/components/the-flag-background.vue'
import { generateCanonicalBlock } from '@/front/src/misc/meta'
import ReturnWay from '@/front/src/pages/destination/components/return-way.vue'
import {
  getDestination,
  getRestriction,
} from '@/front/src/pages/destination/destination-composable'
import { RestrictionStatus } from '@/shared/src/api/restrictions/models'
import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'
import { useI18n } from '@/shared/src/composables/use-plugins'
import {
  useAggregatedLoader,
  useLoadingSwitch,
} from '@/shared/src/composables/use-promise-loading'
import {
  getLabelForCountryCode,
  transformCodeToDestinationSlug,
  transformCodeToOriginSlug,
} from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  meta({
    originCode,
    destinationCode,
    isFallback,
  }: {
    originCode: string
    destinationCode: string
    isFallback: boolean
  }) {
    return {
      title: useI18n().t('page.destination.meta.title', {
        origin: getLabelForCountryCode(originCode),
        destination: getLabelForCountryCode(destinationCode),
      }),
      link: {
        ...(isFallback && {
          canonical: generateCanonicalBlock({
            name: 'destination',
            params: {
              originSlug: transformCodeToOriginSlug(originCode),
              destinationSlug: transformCodeToDestinationSlug(originCode),
            },
          }),
        }),
      },
    }
  },
  components: {
    ReturnWay,
    TheCountryList,
    Portal,
    TheFlagBackground,
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
    const statusMap = {
      [RestrictionStatus.ALLOWED]: 'green',
      [RestrictionStatus.CONDITIONAL]: 'orange',
      [RestrictionStatus.FORBIDDEN]: 'red',
    }

    const statusColor = computed(() => statusMap[restrictionRef.value.status])

    const testingColor = computed(() =>
      getBooleanColor(restrictionRef.value.testRequired),
    )

    const insuranceColor = computed(() =>
      getBooleanColor(restrictionRef.value.insuranceRequired),
    )

    return {
      originCode: originCodeRef,
      destinationCode: destinationCodeRef,
      restriction: restrictionRef,
      destination: destinationRef,
      loading: useAggregatedLoader(
        restrictionLoadingRef,
        destinationLoadingRef,
      ),
      statusColor,
      testingColor,
      insuranceColor,
      isGoingBack: useLoadingSwitch(),
      arrowBack,
    }
  },
})

const getBooleanColor = (value: boolean) => (value ? 'red' : 'green')
</script>
