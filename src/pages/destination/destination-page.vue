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
        :to="{
          name: 'origin',
          params: { originCode: restriction.origin },
        }"
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
        <b>{{ restriction.originLabel }}</b> to <b>{{ restriction.destinationLabel }}</b> <br />
        <span class="text-green text-bold">is allowed</span>
      </h5>
      <div class="q-ma-md text-subtitle2 text-center" v-html="restriction.description" />
      <q-list bordered separator class="q-ma-md">
        <q-item v-ripple clickable>
          <q-item-section>
            <q-item-label caption>{{ $t('restriction.travel.label') }}</q-item-label>
            <q-item-label :class="['text-uppercase', `text-${statusColor}-6`]">
              {{ $t(`restriction.travel.value`)[restriction.status] }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{ $t('restriction.testing.label') }}</q-item-label>
            <q-item-label :class="[`text-${testingColor}-6`]">
              {{ $t(`restriction.testing.value`)[restriction.testRequired] }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{ $t('restriction.insurance.label') }}</q-item-label>
            <q-item-label :class="[`text-${insuranceColor}-6`]">
              {{ $t(`restriction.insurance.value`)[restriction.insuranceRequired] }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>{{ $t('restriction.selfIsolation.label') }}</q-item-label>
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api'
import TheFlagBackground from 'layouts/components/the-flag-background.vue'
import { Portal } from 'portal-vue'

import { RestrictionStatus } from 'src/api/restrictions/models'
import { getRestriction } from 'src/pages/destination/composable'

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
    const { originCode: originCodeRef, destinationCode: destinationCodeRef } = toRefs(props)

    const { restrictionRef, loadingRef } = getRestriction(originCodeRef, destinationCodeRef)

    const statusMap = {
      [RestrictionStatus.ALLOWED]: 'green',
      [RestrictionStatus.CONDITIONAL]: 'orange',
      [RestrictionStatus.FORBIDDEN]: 'red',
    }

    const statusColor = computed(() => {
      return statusMap[restrictionRef.value.status]
    })

    const testingColor = computed(() => getBooleanColor(restrictionRef.value.testRequired))

    const insuranceColor = computed(() => getBooleanColor(restrictionRef.value.insuranceRequired))

    return {
      restriction: restrictionRef,
      loading: loadingRef,
      statusColor,
      testingColor,
      insuranceColor,
    }
  },
})

const getBooleanColor = (value: boolean) => (value ? 'red' : 'green')
</script>
