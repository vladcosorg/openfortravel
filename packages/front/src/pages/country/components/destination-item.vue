<template>
  <div
    class="card full-height relative-position rounded-borders bg-elevation-1"
  >
    <router-link
      v-if="!isLoading"
      v-ripple
      class="column full-height relative-position link"
      style="text-decoration: none; color: inherit"
      clickable
      :to="trip.outgoing.url"
      @click="isClicked = true"
    >
      <div class="bg-elevation-2 q-pa-md">
        <div v-if="returning" class="text-subtitle">
          Returning from
          <country-label :value="trip.outgoing.destination.countryCode" /> to
        </div>
        <div class="text-h5 ellipsis-improved full-width">
          <country-label
            declination="nominative"
            :value="trip.outgoing.destination.countryCode"
            regular
          />
        </div>
        <continent-label
          class="block text-subtitle1 text-primary-subtle"
          :value="trip.outgoing.destination.continent"
        />
      </div>

      <div class="q-pa-md">
        <div class="text-primary-subtle">
          <group-score :score="trip.rating" />
        </div>
        <div class="text-primary-subtle">
          {{ $t('components.destinationItem.riskLevel.title') }}:
          <span :class="riskLevelColor(trip.outgoing.destination.riskLevel)">{{
            $t(
              `components.destinationItem.riskLevel.values.${trip.outgoing.destination.riskLevel}`,
            )
          }}</span>
        </div>
        <q-separator spaced />
        <trip-highlights class="q-mb-md" :trip="trip" />

        <span class="text-hyperlink">See details...</span>
        <!--        </div>-->
      </div>
    </router-link>

    <q-item v-else class="rounded-borders q-pa-md" style="min-height: 212px">
      <q-item-section>
        <q-item-label :class="['q-mb-sm']">
          <q-skeleton animation="none" type="text" height="3rem" width="65%" />
        </q-item-label>
        <q-item-label :class="['text-subtitle2']">
          <q-skeleton
            animation="none"
            type="text"
            height="1.5rem"
            width="45%"
          />
        </q-item-label>
        <q-item-label :class="['q-py-xs']">
          <q-skeleton animation="none" type="text" height="1rem" />
        </q-item-label>
        <q-item-label>
          <q-skeleton animation="none" type="text" height="10px" width="25%" />
        </q-item-label>
        <q-item-label class="q-gutter-sm">
          <q-item-label class="q-gutter-xs row">
            <q-skeleton
              v-for="cnt in 3"
              :key="cnt"
              type="QBadge"
              height="0.9rem"
              width="3rem"
              animation="none"
            />
          </q-item-label>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: inherit;
}
.card {
  &:hover {
    background-color: var(--q-elevation-2);
  }
  &.status-allowed {
    border: 2px solid rgba($positive, 0.5);
  }

  &.status-conditional {
    border: 2px solid rgba($warning, 0.5);
  }

  &.status-forbidden {
    opacity: 0.5;
    border: 2px solid rgba($negative, 0.5);
  }
}

.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  filter: grayscale(90%);
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.01) 50%,
    rgba(0, 0, 0, 0.05) 70%,
    rgba(0, 0, 0, 0.15)
  );
}

.item {
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  border: 2px solid rgba($grey, 0.3);
}

.description {
  line-height: 1.5em !important;
}

.flag {
  width: 50px;
  height: 50px;
  object-fit: cover;
  image-rendering: pixelated;
}
</style>

<script lang="ts">
import { ionRemoveCircleOutline as accessDeniedIcon } from '@quasar/extras/ionicons-v5'
import { computed, defineComponent, ref } from 'vue'

import ContinentLabel from '@/front/src/components/continent-label.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import TripHighlights from '@/front/src/pages/country/components/trip-highlights.vue'
import TripSummary from '@/front/src/pages/country/components/trip-summary.vue'
import { riskLevelColor } from '@/front/src/pages/country/composable'
import GroupScore from '@/front/src/pages/destination/components/restriction-groups/group-score.vue'
import { RoundTrip } from '@/shared/src/models/trip/round-trip'

import type { PropType } from 'vue'

export default defineComponent({
  components: {
    ContinentLabel,
    GroupScore,
    CountryLabel,
    TripHighlights,
    TripSummary,
  },
  props: {
    returning: {
      type: Boolean,
    },
    trip: {
      type: Object as PropType<RoundTrip>,
    },
    hideRiskLevel: {
      type: Boolean,
    },
  },

  setup(props) {
    return {
      riskLevelColor,
      accessDeniedIcon,
      isClicked: ref(false),
      isLoading: computed(() => !props.trip),
    }
  },
})
</script>
