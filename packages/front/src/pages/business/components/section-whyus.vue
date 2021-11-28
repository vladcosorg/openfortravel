<template>
  <landing-section>
    <template #title>
      Why this is the best source of information that you will find anywhere?
    </template>
    <template #subtitle>
      Please fill out the fields below to get information about travel
      restrictions that apply specifically to you
    </template>
    <template #content>
      <div class="grid">
        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6"
              >Optimal travel option based on multiple
              citizenships</q-item-label
            >
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Date of travel analysis</q-item-label>
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Age </q-item-label>
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Age </q-item-label>
            <q-item-label class="text-primary-subtle"
              >Recently visited countries</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6"
              >Complete, incomplete or mixed vaccination protocols
            </q-item-label>
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Recovery certificate</q-item-label>
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6"
              >Temporal validity of documents</q-item-label
            >
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Travel duration</q-item-label>
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon size="md" :name="checkIcon" color="positive" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">Purpose of visit</q-item-label>
            <q-item-label class="text-primary-subtle"
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>
      </div>
    </template>
  </landing-section>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: map-get($space-sm, 'x');

  @media (min-width: $breakpoint-sm-min) {
    grid-gap: map-get($space-lg, 'x');
  }
}
</style>

<script lang="ts">
import { matCheck as checkIcon } from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'

import LandingSection from '@/front/src/components/section-elements/landing-section.vue'

export default defineComponent({
  components: { LandingSection },
  props: {},
  setup(props) {
    return { checkIcon }
  },
})
</script>
