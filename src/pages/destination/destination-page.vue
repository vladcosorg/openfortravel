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
        :to="{
          name: 'origin',
          params: { originCode: restriction.origin },
        }"
      />
    </portal>

    <the-country-list
      :origin-code="originCode"
      :destination-code="destinationCode"
      class="q-mb-xl"
    >
      <q-btn
        class="q-mb-md full-width"
        color="accent"
        text-color="accent"
        icon-right="sync_alt"
        outline
        :label="$t('page.destination.seeReturnPage')"
        :loading="loading"
        :to="{
          name: 'destination',
          params: {
            originCode: restriction.destination,
            destinationCode: restriction.origin,
          },
        }"
      />
    </the-country-list>

    <div v-if="loading">
      <q-card flat style="max-width: 300px">
        <q-skeleton height="150px" square />

        <q-card-section>
          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <!--      <i18n-->
      <!--        path="page.destination.title"-->
      <!--        tag="h1"-->
      <!--        class="text-center text-weight-light text-subtitle1 text-weight-regular"-->
      <!--        style="text-shadow: 1px 1px 5px black"-->
      <!--      >-->
      <!--        <template #origin>-->
      <!--          <br />-->
      <!--          <span class="text-h5 text-weight-bold">{{-->
      <!--            restriction.originLabel-->
      <!--          }}</span-->
      <!--          ><br />-->
      <!--        </template>-->
      <!--        <template #destination>-->
      <!--          <br />-->
      <!--          <span class="text-h5 text-weight-bold">-->
      <!--            {{ restriction.destinationLabel }}</span-->
      <!--          >-->
      <!--        </template>-->
      <!--      </i18n>-->
      <div
        class="text-subtitle1 montserrat text-center"
        v-html="restriction.description"
      />
      {{ restriction }}
      <q-list class="q-mt-md text-subtitle1">
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
      </q-list>

      <q-btn
        class="q-mt-md full-width"
        color="accent"
        icon="arrow_back"
        outline
        :label="$t('page.destination.backToList')"
        :loading="loading"
        align="left"
        :to="{
          name: 'origin',
          params: { originCode: restriction.origin },
        }"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api'
import { Portal } from 'portal-vue'

import { RestrictionStatus } from 'src/api/restrictions/models'
import { useAggregatedLoader } from 'src/composables/use-promise-loading'
import TheCountryList from 'src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from 'src/layouts/components/the-flag-background.vue'
import {
  getDestination,
  getRestriction,
} from 'src/pages/destination/destination-composable'

export default defineComponent({
  components: { TheCountryList, Portal, TheFlagBackground },
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
    }
  },
})

const getBooleanColor = (value: boolean) => (value ? 'red' : 'green')
</script>
