<template>
  <section class="q-my-xl q-pa-xl">
    <div class="container">
      <div class="row justify-center justify-md-between items-center">
        <div
          class="
            column
            col-md-6 col-sm-12 col-12
            text-md-left text-center
            items-md-start items-center
            q-gutter-y-md
          "
        >
          <div class="q-gutter-y-lg">
            <h2 class="text-bold">RESTORING. TRAVELLER. CONFIDENCE.</h2>
            <h5 class="text-primary-subtle">
              Inform your customers about
              <b>current and upcoming COVID-19 travel restrictions</b> that
              apply <b>specifically</b> to them, in a simple and user-friendly
              manner.
            </h5>
          </div>
          <q-btn
            size="xl"
            text-color="primary-inverse"
            color="positive"
            label="Get started"
            :to="getCurrentRelativeURL('reach-out')"
          />
        </div>
        <the-businessman v-if="env.isProd || true" class="col-md-6 col-10" />
      </div>
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
import {
  matCheck as checkIcon,
  matTrendingUp as trendUp,
} from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useEnv } from '@/front/src/composables/misc'
import TheBusinessman from '@/front/src/pages/business/components/section-intro/the-businessman.vue'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'

export default defineComponent({
  components: { TheBusinessman },
  setup(props) {
    const { t } = useI18n()

    return {
      getCurrentRelativeURL,
      checkIcon,
      trendUp,
      ...useEnv(),
    }
  },
})
</script>
