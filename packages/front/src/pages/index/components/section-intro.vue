<template>
  <section class="relative-position">
    <div class="container q-py-xl q-my-md-xl">
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
          "
        >
          <h1 class="text-h1 text-bold">
            <span v-html="t('page.index.sections.hero.title')" />
            &nbsp;<origin-context-inline />
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
        <the-boy v-if="env.isProd" class="col-md-6 col-md-5 col-10" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import { useEnv } from '@/front/src/composables/misc'
import TheBoy from '@/front/src/layouts/components/the-boy/the-boy.vue'
import { getOriginRouteURL } from '@/front/src/router/route-builders/origin'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { OriginContextInline, TheBoy },
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
      url,
      countryLabel,
      ...useEnv(),
    }
  },
})
</script>
