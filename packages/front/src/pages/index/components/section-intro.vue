<template>
  <section class="relative-position">
    <div class="container q-pa-md-xll q-px-mdd q-py-xl q-my-md-xl">
      <div
        class="
          row
          justify-center justify-sm-between
          items-center
          q-col-gutter-y-xl
        "
      >
        <div
          class="
            column
            col-md-6 col-sm-6 col-12
            text-sm-left text-center
            items-sm-start items-center
          "
        >
          <h1 class="text-h1 text-bold">
            <span v-html="$t('page.index.sections.hero.title')" />
            <origin-context-inline />
          </h1>

          <h2
            class="text-sm-subtitle1 text-body2 q-mb-xl q-mt-sm-sm q-mt-lg"
            v-html="
              $t('page.index.sections.hero.subtitle', {
                country: countryLabel,
              })
            "
          />
          <q-btn
            size="lg"
            text-color="primary-inverse"
            color="accent"
            class="text-bold text-capitalize"
            :label="$t('page.index.sections.hero.button')"
            :to="url"
          />
        </div>
        <the-boy class="col-md-6 col-sm-5 col-10" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import TheBoy from '@/front/src/layouts/components/the-boy/the-boy.vue'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'
import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'

export default defineComponent({
  components: { OriginContextInline, TheBoy },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const url = computed(() => getOriginRouteURL())
    const countryLabel = computed(() =>
      getLabelForCountryCode(props.originCode),
    )
    return {
      url,
      countryLabel,
    }
  },
})
</script>
