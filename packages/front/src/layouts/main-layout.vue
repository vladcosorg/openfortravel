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
import { useRootStore, useVueI18n } from '@/shared/src/composables/use-plugins'
import { getCurrentNationality } from '@/shared/src/modules/nationality/nationality-helpers'

const route = useRoute()
const store = useRootStore()
useMeta(() => {
  {
    const { t, i18n } = useVueI18n()
    const title = t(`page.${route.name}.meta.title`, {
      origin: store.getters.currentOrigin.originLabel,
      destination: store.getters.currentOrigin.destinationLabel,
      country: store.getters.currentOrigin.originNominativeLabel,
      nationality: getCurrentNationality(),
    })
    const metaDescription = t(
      `page.${route.name}.meta.descriptiond`,
      {
        origin: store.getters.currentOrigin.originLabel,
        destination: store.getters.currentOrigin.destinationLabel,
        country: store.getters.currentOrigin.originNominativeLabel,
        nationality: getCurrentNationality(),
      },
      'ddd',
    )
    console.log(metaDescription)
    const titleSuffix = t('meta.titleSuffix')
    return {
      title: `${title} - ${titleSuffix}`,
      titleTemplate: (title: string) => {
        const mainTitle = t('meta.title', {
          date: getCurrentMonthAndYear(i18n.locale),
        })
        if (title.trim().length > 0) {
          return `${title} ${mainTitle}`
        }

        return mainTitle
      },
      meta: {
        description: {
          name: 'description',
          content: t('meta.description', {
            country: store.getters.currentOrigin.originLabel,
          }),
        },
      },
    }
  }
})
</script>
