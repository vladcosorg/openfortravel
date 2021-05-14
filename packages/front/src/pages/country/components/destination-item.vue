<template>
  <q-card
    flat
    :class="[
      $style.card,
      'bg-elevation-1 full-height relative-position',
      hideBorder || loading ? '' : `status-${destination.status}`,
    ]"
  >
    <router-link
      v-if="!loading"
      v-ripple
      class="column full-height"
      style="text-decoration: none; color: inherit"
      clickable
      :to="{
        name: 'destination',
        params: {
          originSlug: destination.originSlug,
          destinationSlug: destination.destinationSlug,
        },
      }"
      @click.native="isClicked = true"
    >
      <q-card-section>
        <div v-if="returning" class="text-subtitle1">
          Returning from <b>{{ destination.originNominativeLabel }}</b> to
        </div>
        <div class="text-h6 ellipsis-improved full-width">
          {{ destination.destinationNominativeLabel }}
        </div>

        <div
          v-if="!hideRiskLevel"
          :class="[riskLevelColor(destination.country.riskLevel)]"
        >
          {{ $t('components.destinationItem.riskLevel.title') }}:
          {{
            $t('components.destinationItem.riskLevel.values')[
              destination.country.riskLevel
            ]
          }}
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="gt-xs" style="flex-grow: 1">
        <div v-html="destination.shortDescription" />
        <a href="">Read more → </a>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-x-sm">
          <q-badge color="green" outline> Entry allowed </q-badge>
          <q-badge color="blue" outline>No quarantine</q-badge>
        </div>
      </q-card-section>
      <!--      <q-card-section class="text-caption"-->
      <!--        >Only valid if you are arriving from <b>Ukraine</b> as a citizen-->
      <!--        <b>Ukraine</b> that is <b>not vaccinated</b> and you have not visited-->
      <!--        any countries recently.</q-card-section-->
      <!--      >-->
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
  ionAlertCircleOutline as warningIcon,
  ionBaseballOutline as icon,
} from '@quasar/extras/ionicons-v5'
import type { PropType } from '@vue/composition-api'
import { defineComponent, ref } from '@vue/composition-api'

import { riskLevelColor } from '@/front/src/pages/country/composable'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    returning: {
      type: Boolean,
      default: false,
    },
    destination: {
      type: Object as PropType<Restriction>,
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

  setup() {
    return {
      riskLevelColor,
      isClicked: ref(false),
      icon,
      warningIcon,
    }
  },
})
</script>
