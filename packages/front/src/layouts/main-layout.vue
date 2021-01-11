<template>
  <q-layout view="hhr lpr ffr">
    <the-header v-model="menuOpen" />
    <the-drawer v-model="menuOpen" />

    <q-page-container
      :class="[
        'bg-primary',
        'q-px-md',
        fullHeight && !$q.platform.is.ios ? 'wwindow-height' : '',
        $style.container,
      ]"
    >
      <portal-target name="top" slim />
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="500"
      >
        <router-view class="q-pb-md q-pt-xl" />
      </transition>
    </q-page-container>
    <the-footer />
  </q-layout>
</template>
<style lang="scss" module>
.header {
  //background-color: #14171a;
  //background: linear-gradient(
  //  to bottom,
  //  rgba(18, 18, 18, 0.7) 70%,
  //  rgba(0, 0, 0, 0)
  //);
}
.container {
  overflow-x: hidden;
  color: white;
}
</style>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { merge } from 'lodash'
import { PortalTarget } from 'portal-vue'
import { date } from 'quasar'
import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'

import TheDrawer from '@/front/src/layouts/components/the-drawer.vue'
import TheFooter from '@/front/src/layouts/components/the-footer.vue'
import TheHeader from '@/front/src/layouts/components/the-header.vue'
import { getCurrentCountryLabel } from '@/front/src/misc/country-decider'
import { useMeta } from '@/front/src/modules/langhref/langhref-composable'
import { useI18n, useRouter } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {
    TheDrawer,
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
    const menuOpen = ref(false)
    return {
      menuOpen,
      meta: useMeta(),
    }
  },
})
</script>
