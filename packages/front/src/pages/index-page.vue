<template>
  <q-page :class="['column fit justify-around no-wrap', $style.page]">
    <portal to="top">
      <the-flag-background :first-country-code="originCode" />
    </portal>
    <div class="text-center">
      <div class="text-h5 text-uppercase text-bold">COVID-19 travel bans</div>
      <div class="text-h6" style="font-weight: normal">
        for travellers from<br />
        <b
          class="text-accent text-h6 text-bold"
          style="border-bottom: 1px dotted"
          >United States of America</b
        >
      </div>
    </div>
    <div class="text-center q-mb-xl">
      <q-btn text-color="primary" color="accent"> Show me destinations </q-btn>
    </div>
    <!--    <h1-->
    <!--      :class="[$style.hero, 'text-h5 text-bold text-center q-mb-xl']"-->
    <!--      v-html="$t('page.index.hero', { country: country })"-->
    <!--    />-->

    <boy :class="['q-mb-xl']" />
    <div :class="['relative-position', 'text-center']">
      <the-country-list />
    </div>
    <!--    <h2 class="text-h6">You’ve got questions - we’ve got answers!</h2>-->
  </q-page>
</template>

<style lang="scss" module>
.page {
  z-index: 2;
}
.hero span {
  font-weight: bold;
}
</style>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { Portal } from 'portal-vue'
import { hydrateWhenIdle } from 'vue-lazy-hydration'

import Boy from '@/front/src/layouts/components/the-boy/the-boy.vue'
import TheCountryList from '@/front/src/layouts/components/the-country-list/the-country-list.vue'
import TheFlagBackground from '@/front/src/layouts/components/the-flag-background.vue'
import { useComputedMemorized } from '@/shared/src/composables/use-computed-vmodel'
import { useI18n } from '@/shared/src/composables/use-plugins'
import { getLabelForCountryCode } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  meta({ unsafeOriginCode }: { unsafeOriginCode: string }) {
    return {
      title: useI18n().t('page.index.meta.title', {
        nationality: getLabelForCountryCode(unsafeOriginCode),
      }),
    }
  },
  components: {
    TheCountryList: hydrateWhenIdle(TheCountryList),
    Boy: hydrateWhenIdle(Boy),
    TheFlagBackground,
    Portal,
  },
  props: {
    unsafeOriginCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      originCode: useComputedMemorized(() => props.unsafeOriginCode),
      country: computed(() => getLabelForCountryCode(props.unsafeOriginCode)),
    }
  },
})
</script>
