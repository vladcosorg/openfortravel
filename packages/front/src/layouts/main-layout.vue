<template>
  <q-layout view="hhr lpr ffr">
    <the-header />
    <q-page-container
      :class="[
        fullHeight && !$q.platform.is.ios ? 'wwindow-height' : '',
        $style.container,
      ]"
    >
      <!--      <portal-target name="top" slim />-->
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

<style lang="scss" module>
.container {
  overflow-x: hidden;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/front/src/layouts/components/the-header/the-header.vue'
import TheFooter from '@/front/src/layouts/components/the-footer/the-footer.vue'

export default defineComponent({
  components: {
    TheFooter,
    TheHeader,
  },
  // meta({ meta }: { meta: Record<string, string> }) {
  //   const title = useI18n().t(
  //     `page.${useRouter().currentRoute.name}.meta.title`,
  //   )
  //   const titleSuffix = useI18n().t('meta.titleSuffix')
  //   return merge(
  //     {
  //       title: `${title} - ${titleSuffix}`,
  //       titleTemplate: (title: string) => {
  //         const mainTitle = useI18n().t('meta.title', {
  //           date: date.formatDate(Date.now(), 'MMMM YYYY'),
  //         })
  //         if (title.trim().length > 0) {
  //           return `${title} ${mainTitle}`
  //         }
  //
  //         return mainTitle
  //       },
  //       meta: {
  //         description: {
  //           name: 'description',
  //           content: useI18n().t('meta.description', {
  //             country: getCurrentCountryLabel(),
  //           }),
  //         },
  //       },
  //     },
  //     meta,
  //   )
  // },
  props: {
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
