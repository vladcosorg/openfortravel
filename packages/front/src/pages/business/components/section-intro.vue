<template>
  <div>
    <div class="container relative-position">
      <section-bg-shape class="shape-1" />

      <div class="row justify-center justify-md-between items-center">
        <the-businessman
          v-if="env.isProd || true"
          class="col-md-7 col-12 order-sm-last"
        />
        <div
          class="
            column
            roomy
            col-md col-sm-12 col-12
            text-md-left text-center
            items-md-start items-center
          "
        >
          <div class="q-gutter-y-xl">
            <div>
              <h4>Dear Airline company,</h4>
              <h2 class="text-capitalize text-bold">
                <b class="text-accent">It's time fight back COVID-19</b> and
                restore traveller confidence
              </h2>
            </div>
            <div>
              <h5 class="lh-base">
                Our mission is to help your customers feel
                <b>safe & confident</b> about their travel plans, by providing
                <b>personalized guidance</b> and keeping them informed
                throughout their trip on your behalf.
              </h5>
            </div>
            <!--            <div>-->
            <!--              <div class="lh-base text-bold text-h3 text-uppercase">-->
            <!--                Who is it for?-->
            <!--              </div>-->
            <!--              <div class="text-h4 text-primary-subtle text-bold">-->
            <!--                Travel companies-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div>-->
            <!--              <div class="lh-base text-bold text-h3">How can we help?</div>-->
            <!--              <div class="text-h5 text-primary-subtle text-bold lh-base">-->
            <!--                Our mission is to provide a simple solution for travel companies-->
            <!--                to track, inform and notify their customers about-->
            <!--                pandemic-related travel restrictions.-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <h5 class="lh-base text-bold">Who is it for?</h5>-->
            <!--            <h5 class="lh-base text-bold">-->
            <!--            -->
            <!--            </h5>-->
            <!--            <h4>-->
            <!--              Inform your customers about-->
            <!--              <b>current and upcoming COVID-19 travel restrictions</b> that-->
            <!--              apply <b>specifically</b> to them, in a simple and user-friendly-->
            <!--              manner.-->
            <!--            </h4>-->
            <q-btn
              size="xl"
              unelevated
              color="accent"
              class="text-bold"
              text-color="primary-inverse"
              label="Get started"
              :to="getCurrentRelativeURL('reach-out')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.shape-1
  transform: rotate3d(10, 20, 30, -50deg)
  width: 200px
  bottom: 40%
.benefits
  .q-item
    @media (max-width: $breakpoint-xs-max)
      padding-left: 0
      padding-right: 0
</style>

<script lang="ts">
import { matLooksOne as oneIcon } from '@quasar/extras/material-icons'
import { defineComponent } from 'vue'

import { useEnv } from '@/front/src/composables/misc'
import SectionBgShape from '@/front/src/pages/business/components/common/section-bg-shape.vue'
import TheBusinessman from '@/front/src/pages/business/components/section-intro/the-businessman.vue'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'

export default defineComponent({
  components: { SectionBgShape, TheBusinessman },
  setup() {
    return {
      getCurrentRelativeURL,
      ...useEnv(),
      oneIcon,
    }
  },
})
</script>
