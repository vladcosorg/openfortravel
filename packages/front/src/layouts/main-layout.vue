<template>
  <q-layout view="hhr lpr ffr">
    <the-header />
    <q-page-container style="overflow-x: hidden">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
          :duration="100"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <the-footer />
  </q-layout>
</template>

<script lang="ts" setup>
import { useMeta } from 'quasar'
import { useRoute } from 'vue-router'

import TheFooter from '@/front/src/layouts/components/the-footer/the-footer.vue'
import TheHeader from '@/front/src/layouts/components/the-header/the-header.vue'
import { getCurrentMonthAndYear } from '@/front/src/misc/date'
import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { getCurrentNationality } from '@/shared/src/modules/nationality/nationality-helpers'

const route = useRoute()
const store = useRootStore()
useMeta(() => {
  {
    const { tl, t, locale } = useCustomI18n()

    const title = tl(`page.${route.name}.meta.title`, {
      origin: store.getters.currentOrigin.originLabel,
      destination: store.getters.currentOrigin.destinationLabel,
      country: store.getters.currentOrigin.originNominativeLabel,
      nationality: getCurrentNationality(),
    })

    const titleSuffix = t('meta.titleSuffix')
    return {
      title: `${title} - ${titleSuffix}`,
      titleTemplate: (title: string) => {
        const mainTitle = t('meta.title', {
          date: getCurrentMonthAndYear(locale.value),
        })
        if (title.trim().length > 0) {
          return `${title} ${mainTitle}`
        }

        return mainTitle
      },
      meta: {
        description: {
          name: 'description',
          content: tl(
            `page.${route.name}.meta.description`,
            {
              origin: store.getters.currentOrigin.originLabel,
              destination: store.getters.currentOrigin.destinationLabel,
              country: store.getters.currentOrigin.originNominativeLabel,
              nationality: getCurrentNationality(),
            },
            t('meta.description', {
              country: store.getters.currentOrigin.originLabel,
            }),
          ),
        },
      },
    }
  }
})
</script>
