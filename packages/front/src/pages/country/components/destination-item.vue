<template>
  <q-card
    flat
    :class="[
      $style.card,
      'bg-elevation-1 full-height relative-position',
      hideBorder || loading ? '' : `status-${journey.status}`,
    ]"
  >
    <router-link
      v-if="!loading"
      v-ripple
      class="column full-height relative-position"
      style="text-decoration: none; color: inherit"
      clickable
      :to="journey.detailsURL"
      @click.native="isClicked = true"
    >
      <q-card-section>
        <div v-if="returning" class="text-subtitle">
          Returning from <country-label :value="journey.originISO" /> to
        </div>
        <div class="text-h6 ellipsis-improved full-width">
          <country-label :value="journey.destinationISO" regular />
        </div>

        <div v-if="!hideRiskLevel" class="text-caption text-primary-subtle">
          {{ $t('components.destinationItem.riskLevel.title') }}:
          <span :class="riskLevelColor(journey.destination.riskLevel)">{{
            $t('components.destinationItem.riskLevel.values')[
              journey.destination.riskLevel
            ]
          }}</span>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section v-if="journey.isForbidden" style="flex-grow: 1">
        <div class="text-center">
          <q-icon :name="accessDeniedIcon" color="negative" size="lg" />
          <div>Access denied</div>
        </div>
      </q-card-section>
      <q-card-section v-else style="flex-grow: 1">
        <trip-summary class="text-caption" :journey="journey" />
        <trip-highlights :journey="journey" />
      </q-card-section>
      <q-card-actions class="bg-elevation-1" align="between">
        <div class="text-primary-subtle">
          <q-icon size="xs" :name="infoIcon" />
          Trip Score <group-score :score="journey.score" />
          <q-tooltip
            >The higher the core the less restrictions and requirements you are
            required to abide</q-tooltip
          >
        </div>
        <span class="text-uppercase text-hyperlink">Read more</span>
      </q-card-actions>
    </router-link>

    <q-item
      v-else
      :class="[$style.item, 'rounded-borders q-pa-md']"
      style="min-height: 212px"
    >
      <q-item-section>
        <q-item-label :class="['q-mb-sm']">
          <q-skeleton type="text" height="3rem" width="65%" />
        </q-item-label>
        <q-item-label :class="['text-subtitle2']">
          <q-skeleton type="text" height="1.5rem" width="45%" />
        </q-item-label>
        <q-item-label :class="['q-py-xs']">
          <q-skeleton type="text" height="1rem" />
        </q-item-label>
        <q-item-label>
          <q-skeleton type="text" height="10px" width="25%" />
        </q-item-label>
        <q-item-label class="q-gutter-sm">
          <q-item-label class="q-gutter-xs row">
            <q-skeleton
              v-for="cnt in 3"
              :key="cnt"
              type="QBadge"
              height="0.9rem"
              width="3rem"
            />
          </q-item-label>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style lang="scss" module>
.card {
  &:global(.status-allowed) {
    border: 2px solid rgba($positive, 0.5);
  }

  &:global(.status-conditional) {
    border: 2px solid rgba($warning, 0.5);
  }

  &:global(.status-forbidden) {
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
import {
  ionBaseballOutline as icon,
  ionRemoveCircleOutline as accessDeniedIcon,
  ionInformationCircleOutline as infoIcon,
} from '@quasar/extras/ionicons-v5'
import type { PropType } from '@vue/composition-api'
import { defineComponent, ref } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { TripCard } from '@/front/src/models/TripCard'
import TripHighlights from '@/front/src/pages/country/components/trip-highlights.vue'
import TripSummary from '@/front/src/pages/country/components/trip-summary.vue'
import { riskLevelColor } from '@/front/src/pages/country/composable'
import GroupScore from '@/front/src/pages/destination/components/restriction-groups/group-score.vue'

export default defineComponent({
  components: { GroupScore, CountryLabel, TripHighlights, TripSummary },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    returning: {
      type: Boolean,
      default: false,
    },
    journey: {
      type: Object as PropType<TripCard>,
    },
    hideRiskLevel: {
      type: Boolean,
      default: false,
    },
    hideBorder: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    return {
      riskLevelColor,
      accessDeniedIcon,
      isClicked: ref(false),
      icon,
      infoIcon,
    }
  },
})
</script>
