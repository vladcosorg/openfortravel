<template>
  <section class="rounded-borders">
    <widget-header
      :title="$t('page.destination.widgets.info.title')"
      :subtitle="$t('page.destination.widgets.info.subtitle')"
    />
    <div class="bg-elevation-1 rounded-borders q-pa-lg">
      <div v-if="!destination || isLoading">
        <q-skeleton type="text" width="30%" />
        <q-skeleton type="text" width="80%" />
        <q-skeleton type="text" width="40%" />
      </div>
      <div v-else-if="destination.linkList.length === 0">
        {{ $t('page.destination.widgets.info.none') }}
      </div>
      <a
        v-for="(link, index) in destination.linkList"
        v-else
        :key="index"
        target="_blank"
        class="block"
        :href="link"
      >
        {{ link }}
      </a>
    </div>
  </section>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { Destination } from '@/shared/src/api/destinations/models'

export default defineComponent({
  components: { WidgetHeader },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    destination: {
      type: Object as PropType<Destination>,
    },
  },
})
</script>
