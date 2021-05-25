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
          <h1 :class="['text-h2', $style.intro]">
            <div v-html="$t('page.index.sections.hero.title')" />

            <router-link
              class="text-secondary"
              :to="{ hash: 'country-list' }"
              append
            >
              <span>{{ countryLabel }}</span>
            </router-link>
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
            :to="getMenuItemURL('origin')"
          />
        </div>
        <the-boy class="col-md-6 col-sm-5 col-10" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" module>
.intro {
  font-weight: bold;
  //line-height: 2.7rem;
  a {
    text-decoration: none;
    font-weight: normal;
  }
  span {
    border-bottom: 1px dashed;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import TheBoy from '@/front/src/layouts/components/the-boy/the-boy.vue'
import { getMenuItemURL } from '@/front/src/misc/menu'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { TheBoy },
  props: {
    originCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const countryLabel = computed(() =>
      getLabelForCountryCode(props.originCode),
    )
    return {
      countryLabel,
      getMenuItemURL,
    }
  },
})
</script>
