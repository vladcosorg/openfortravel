<template>
  <q-layout view="hhr lpr ffr">
    <the-header />
    <q-page-container
      :class="[
        fullHeight && !$q.platform.is.ios ? 'wwindow-height' : '',
        $style.container,
      ]"
    >
      <portal-target name="top" slim />
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="100"
      >
        <router-view />
      </transition>
    </q-page-container>
    <the-footer />
  </q-layout>
</template>
<style lang="scss" module>
.container {
  overflow-x: hidden;
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import merge from 'lodash/merge'
import { PortalTarget } from 'portal-vue'
import { date } from 'quasar'
import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'

import TheFooter from '@/front/src/layouts/components/the-footer/the-footer.vue'
import TheHeader from '@/front/src/layouts/components/the-header/the-header.vue'
import { getCurrentCountryLabel } from '@/front/src/misc/country-decider'
import { useMeta } from '@/front/src/modules/langhref/langhref-composable'
import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    TheFooter: hydrateWhenVisible(TheFooter),
    TheHeader: hydrateWhenIdle(TheHeader),
    PortalTarget,
  },
  meta({ meta }: { meta: Record<string, string> }) {
    const title = useI18n().t(
      `page.${useRouter().currentRoute.name}.meta.title`,
    )
    const titleSuffix = useI18n().t('meta.titleSuffix')
    return merge(
      {
        title: `${title} - ${titleSuffix}`,
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
