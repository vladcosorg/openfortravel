<template>
  <q-card flat class="bg-elevation-1 full-height relative-position">
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
        <h5 :class="`ellipsis-improved full-width ${$style.label}`">
          {{ destination.destinationNominativeLabel }}
        </h5>
        <div :class="[riskLevelColor(country.riskLevel)]">
          {{ $t('components.destinationItem.riskLevel.title') }}:
          {{ $t('components.destinationItem.riskLevel.values')[country.riskLevel] }}
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="gt-xs" style="flex-grow: 1">
        <div v-html="destination.shortDescription" />
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-x-xs">
          <q-badge v-if="destination.status === 'allowed'" color="positive" text-color="dark">
            {{ $t('restriction.travel.badgeValue')[destination.status] }}
          </q-badge>
          <q-badge
            v-if="destination.status === 'conditional'"
            color="warning"
            text-color="dark"
          >
            {{ $t('restriction.travel.badgeValue')[destination.status] }}
          </q-badge>
          <q-badge
            v-if="destination.status === 'forbidden'"
            color="negative"
            text-color="white"
          >
            {{ $t('restriction.travel.badgeValue')[destination.status] }}
          </q-badge>
          <q-badge
            v-if="!destination.needsSelfIsolation()"
            color="warning"
            text-color="primary-inverse"
          >
            {{ $t('restriction.selfIsolation.label') }}
          </q-badge>
          <q-badge v-if="destination.testRequired" color="extra-purple">
            {{ $t('restriction.testing.label') }}
          </q-badge>
        </div>
      </q-card-section>
    </router-link>
    <q-item v-else :class="[$style.item, 'rounded-borders q-pa-md']" style="min-height: 212px">
      <q-item-section>
        <q-item-label :class="[' q-mb-sm']">
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
.label {
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

  //&:global(.allowed) {
  //  border: 1px solid rgba($positive, 0.3);
  //}
  //
  //&:global(.conditional) {
  //  border: 2px solid rgba($warning, 0.3);
  //}
  //
  //&:global(.forbidden) {
  //  border: 2px solid rgba($negative, 0.3);
  //}
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
  ionAlertCircleOutline as warningIcon,
} from '@quasar/extras/ionicons-v5'
import { defineComponent, PropType, ref } from '@vue/composition-api'

import { riskLevelColor } from '@/front/src/pages/country/composable'
import { Destination } from '@/shared/src/api/destinations/models'
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
    country: {
      type: Object as PropType<Destination>,
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
