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
        icon="arrow_back"
        :to="{ name: 'origin', params: { originCode: origin.countryCode } }"
      />
    </portal>

    <div v-if="loading" class="q-pa-md">
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
      <h5 class="text-center text-weight-light">
        Traveling from<br />
        <b>{{ origin.countryLabel }}</b> to
        <b>{{ destination.countryLabel }}</b> <br />
        <span class="text-green text-bold">is allowed</span>
      </h5>
      <div class="q-ma-md text-subtitle2 text-center" v-html="description" />
      <q-list bordered separator class="q-ma-md">
        <q-item v-ripple clickable>
          <q-item-section>
            <q-item-label caption>{{
              $t('restriction.travel.label')
            }}</q-item-label>
            <q-item-label :class="['text-uppercase', `text-${statusColor}-6`]">
              {{ $t(`restriction.travel.value`)[destination.status] }}
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
                $t(`restriction.testing.value`)[destination.testRequired]
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
                $t(`restriction.insurance.value`)[destination.insuranceRequired]
              }}</q-item-label
            >
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
                  days: destination.selfIsolation,
                })
              }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api'
import TheFlagBackground from 'layouts/components/the-flag-background.vue'
import { Portal } from 'portal-vue'

import { DestinationStatus } from 'src/api/destinations'
import { useCurrentDestination } from 'src/composables/use-current-destination'
import { useCurrentOrigin } from 'src/composables/use-current-origin'
import { useAggregatedLoader } from 'src/composables/use-promise-loading'
import { getFullDescription } from 'src/models/description'

export default defineComponent({
  components: { Portal, TheFlagBackground },
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
    const { originCode, destinationCode } = toRefs<{
      originCode: string
      destinationCode: string
    }>(props)

    const { destination, loading: destinationLoading } = useCurrentDestination(
      originCode.value,
      destinationCode.value,
    )
    const { origin, loading: originLoading } = useCurrentOrigin(originCode)
    const loading = useAggregatedLoader(destinationLoading, originLoading)

    const description = computed(() =>
      getFullDescription(origin.value, destination.value),
    )

    const statusMap = {
      [DestinationStatus.ALLOWED]: 'green',
      [DestinationStatus.CONDITIONAL]: 'orange',
      [DestinationStatus.FORBIDDEN]: 'red',
    }

    const statusColor = computed(() => {
      return statusMap[destination.value.status]
    })

    const testingColor = computed(() =>
      getBooleanColor(destination.value.testRequired),
    )

    const insuranceColor = computed(() =>
      getBooleanColor(destination.value.insuranceRequired),
    )

    return {
      origin,
      destination,
      loading,
      description,
      statusColor,
      testingColor,
      insuranceColor,
    }
  },
})

const getBooleanColor = (value: boolean) => (value ? 'red' : 'green')
</script>
