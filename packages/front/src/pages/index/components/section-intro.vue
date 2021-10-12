<template>
  <section class="relative-position">
    <div class="container q-my-md-xl q-pb-xl">
      <div
        class="
          row
          justify-center justify-md-between
          items-center
          q-col-gutter-y-xl
        "
      >
        <div
          class="
            column
            col-md-6 col-sm-12 col-12
            text-md-left text-center
            items-md-start items-center
            q-gutter-lg
          "
        >
          <div class="q-gutter-y-md">
            <h1
              class="block text-capitalize q-mb-none"
              style="font-weight: bold !important"
            >
              <span class="text-accent text-normal">COVID-19</span> <br />

              {{ $t('page.index.sections.hero.header') }}
            </h1>
            <h5 class="text-primary-subtle text-capitalize">
              Your guide for safe travel in post-pandemic world
            </h5>
            <!--            <i18n-l-->
            <!--              class="text-h4"-->
            <!--              keypath="page.index.sections.hero.subtitle"-->
            <!--              tag="h3"-->
            <!--            >-->
            <!--              <template #origin><origin-context-inline /> </template>-->
            <!--            </i18n-l>-->
          </div>
        </div>

        <the-boy v-if="env.isProd || true" class="col-md-6 col-md-5 col-10" />

        <div class="q-gutter-y-lg">
          <i18n-l
            class="text-h4"
            keypath="page.index.sections.hero.subtitle"
            tag="h3"
          >
            <template #origin><origin-context-inline /> </template>
          </i18n-l>
          <div class="row q-col-gutter-sm-md q-col-gutter-sm items-stretch">
            <stats-item
              type="open"
              :count="36"
              class="col-12 col-sm-6 col-md"
            />
            <stats-item
              type="test"
              :count="36"
              class="col-12 col-sm-6 col-md"
            />
            <stats-item
              type="quarantine"
              :count="36"
              class="col-12 col-sm-6 col-md"
            />
            <stats-item
              type="forbidden"
              :count="36"
              class="col-12 col-sm-6 col-md"
            />
          </div>
          <div class="text-center text-md-left">
            <q-btn
              size="lg"
              text-color="primary-inverse"
              color="accent"
              class="text-bold text-capitalize"
              :label="$t('page.index.sections.hero.button')"
              :to="url"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="benefits hidden">
      <q-item>
        <q-item-section avatar>
          <q-icon size="lg" :name="checkIcon" color="positive" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6 text-normal">
            Save money by being informed on COVID-19 fees and quarantine
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon size="lg" :name="checkIcon" color="positive" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6 text-normal"
            >Receive <a href="">personalized directions</a> based on your
            <b>citizenship</b>, <b>type of vaccine</b>, etc.</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon size="lg" :name="checkIcon" color="positive" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6 text-normal"
            >Access manually verified and up-to-date info</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon size="lg" :name="checkIcon" color="positive" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6 text-normal">
            Get notified immediately on restriction changes
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </section>
</template>

<style lang="sass">
.benefits
  .q-item
    @media (max-width: $breakpoint-xs-max)
      padding-left: 0
      padding-right: 0
</style>

<script lang="ts">
import { matCheck as checkIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import { useEnv } from '@/front/src/composables/misc'
import TheBoy from '@/front/src/layouts/components/the-boy/the-boy.vue'
import I18nL from '@/front/src/modules/i18n/i18n-l.vue'
import StatsItem from '@/front/src/pages/country/components/the-search-stats/stats-item.vue'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { StatsItem, I18nL, OriginContextInline, TheBoy },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n()
    const url = computed(() => getOriginRouteURL())
    const countryLabel = computed(() =>
      getLabelForCountryCode(props.originCode),
    )

    return {
      t,
      checkIcon,
      url,
      countryLabel,
      ...useEnv(),
    }
  },
})
</script>
