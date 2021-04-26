<template>
  <q-list :class="['text-subtitle1']">
    <widget-header
      :title="$t('page.destination.widgets.entryRequirements.title')"
      :subtitle="$t('page.destination.widgets.entryRequirements.subtitle')"
    />
    <groups-by-type
      v-if="groups.available.length"
      :restrictions-groups="groups.available"
      type-label="Available"
      :available="true"
    />
    <div
      v-else
      class="text-center rounded-borders q-pa-lg q-mb-lg"
      style="border: 1px solid gray"
    >
      <q-icon :name="stopIcon" color="negative" size="xl" class="q-mb-sm" />
      <h4>According to available information</h4>
      <h5 class="text-negative">currently you cannot enter this country</h5>
      <div class="text-subtitle2">
        Please subcribe to alerts in the form below to be notified when you can access this
        country
      </div>
    </div>
    <groups-by-type
      :restrictions-groups="groups.unavailable"
      type-label="Unavailable"
      :available="false"
    />
  </q-list>
</template>

<script lang="ts">
import { matDangerous as stopIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent, inject } from '@vue/composition-api'

import GroupsByType from '@/front/src/pages/destination/components/restriction-groups/groups-by-type.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'

export default defineComponent({
  components: { GroupsByType, WidgetHeader },
  props: {},
  setup() {
    const store = inject(StoreKey) as StoreModule
    const groups = computed(() => store.getters.entryWays.getGroups())
    return {
      groups,
      stopIcon,
    }
  },
})
</script>