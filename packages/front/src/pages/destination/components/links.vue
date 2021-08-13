<template>
  <section class="rounded-borders">
    <widget-header>
      <template #title>
        <i18n-t
          :keypath="`page.destination.widgets.info.${
            returnDirection ? 'returnTitle' : 'title'
          }`"
          tag="span"
        >
          <template #country>
            <country-label :value="destination.countryCode" />
          </template>
        </i18n-t>
      </template>
      <template #subtitle>
        <i18n-t keypath="page.destination.widgets.info.subtitle" tag="span">
          <template #country>
            <b> <country-label :value="destination.countryCode" /></b>
          </template>
        </i18n-t>
      </template>
    </widget-header>
    <ul class="rounded-borders q-pa-lg">
      <div v-if="!destination || isLoading">
        <q-skeleton type="text" width="30%" />
        <q-skeleton type="text" width="80%" />
        <q-skeleton type="text" width="40%" />
      </div>
      <div v-else-if="destination.linkList.length === 0">
        {{ $t('page.destination.widgets.info.none') }}
      </div>
      <li v-for="(link, index) in destination.linkList" v-else :key="index">
        <a ref="nofollow" target="_blank" :href="link">
          {{ link }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import type { Destination } from '@/shared/src/api/destinations/models'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'

export default defineComponent({
  components: { CountryLabel, WidgetHeader },
  props: {
    returnDirection: {
      type: Boolean,
    },
    isLoading: {
      type: Boolean,
    },
    destination: {
      type: Object as PropType<Destination>,
    },
  },
})
</script>
