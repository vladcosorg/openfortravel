<template>
  <q-layout view="hhr lpr ffr">
    <portal-target name="top" slim />

    <q-header class="bg-transparent">
      <header-bar class="q-pb-lg" />
    </q-header>

    <q-page-container
      :class="[
        $style.container,
        'q-px-md',
        fullHeight && !$q.platform.is.ios ? 'wwindow-height' : '',
      ]"
    >
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="500"
      >
        <router-view class="q-pb-md" />
      </transition>
    </q-page-container>
    <the-footer />
  </q-layout>
</template>
<style lang="scss" module>
.container {
  overflow-x: hidden;
  background-color: #222930;
  color: white;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { merge } from 'lodash'
import { PortalTarget } from 'portal-vue'
import { date } from 'quasar'
import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'

import TheFooter from '@/front/src/layouts/components/the-footer.vue'
import HeaderBar from '@/front/src/layouts/components/the-header-bar.vue'
import { getCurrentCountryLabel } from '@/front/src/misc/country-decider'
import { useMeta } from '@/front/src/modules/langhref/langhref-composable'
import { useI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    TheFooter: hydrateWhenVisible(TheFooter),
    HeaderBar: hydrateWhenIdle(HeaderBar),
    PortalTarget,
  },
  meta({ meta }: { meta: Record<string, string> }) {
    return merge(
      {
        title: ' ',
        titleTemplate: (title: string) => {
          const mainTitle = useI18n().t('meta.title', {
            date: date.formatDate(Date.now(), 'MMMM YYYY'),
          })
          if (title.trim().length > 0) {
            return `${title} ${mainTitle}`
          }

          return mainTitle
        },
        meta: {
          description: {
            name: 'description',
            content: useI18n().t('meta.description', {
              country: getCurrentCountryLabel(),
            }),
          },
        },
      },
      meta,
    )
  },
  props: {
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      meta: useMeta(),
    }
  },
})
</script>
