<template>
  <q-page class="q-px-md q-py-xl">
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
        icon="arrow_back"
        :loading="isGoingBack.state"
        :to="{
          name: 'origin',
          params: { originCode: restriction.origin },
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
      class="text-subtitle1 montserrat text-center"
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
                >Fill online</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.selfIsolation.label')
            }}</q-item-label>
            <q-item-label>
              {{
                $t(`restriction.selfIsolation.value`, {
                  days: restriction.selfIsolation,
                })
              }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </template>
    </q-list>
    <q-btn
      class="q-mt-md full-width"
      color="accent"
      icon="arrow_back"
      outline
      :label="$t('page.destination.backToList')"
      :loading="isGoingBack.state"
      align="left"
      :to="{
        name: 'origin',
        params: { originCode: restriction.origin },
      }"
      @click="isGoingBack.toggle"
    />
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import { RestrictionStatus } from 'src/api/restrictions/models'
import {
  useAggregatedLoader,
  useLoadingSwitch,
} from 'src/composables/use-promise-loading'
import TheCountryList from 'src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from 'src/layouts/components/the-flag-background.vue'
import ReturnWay from 'src/pages/destination/components/return-way.vue'
import {
  getDestination,
  getRestriction,
} from 'src/pages/destination/destination-composable'

export default defineComponent({
  components: { ReturnWay, TheCountryList, Portal, TheFlagBackground },
  props: {
    originCode: {
      type: String,
      required: true,
    },
    destinationCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {
      originCode: originCodeRef,
      destinationCode: destinationCodeRef,
    } = toRefs(props)

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

    const statusColor = computed(() => {
      return statusMap[restrictionRef.value.status]
    })

    const testingColor = computed(() =>
      getBooleanColor(restrictionRef.value.testRequired),
    )

    const insuranceColor = computed(() =>
      getBooleanColor(restrictionRef.value.insuranceRequired),
    )

    return {
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
    }
  },
})

const getBooleanColor = (value: boolean) => (value ? 'red' : 'green')
</script>
