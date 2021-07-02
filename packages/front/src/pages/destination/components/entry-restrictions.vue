<template>
  <q-list :class="['text-subtitle1']">
    <widget-header>
      <template v-if="returnRestrictions" #title> Return travel </template>
      <template v-else #title> Outgoing travel </template>

      <template #subtitle>
        {{ returnRestrictions ? 'returning' : 'travelling' }} from
        <country-label :value="originISO" /> to
        <country-label :value="destinationISO" />
      </template>
    </widget-header>

    <groups-by-type
      v-if="bestAvailableGroup.length > 0"
      :restrictions-groups="bestAvailableGroup"
      type-label="Available"
      :available="true"
    />
    <q-item
      v-else
      class="rounded-borders bg-elevation-1 q-py-md q-my-md bg-negative"
    >
      <q-item-section avatar top class="justify-center">
        <q-icon :name="stopIcon" color="primary-inverse" size="xl" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-primary-inverse">
          According to available information currently you cannot enter this
          country.</q-item-label
        >
      </q-item-section>
    </q-item>

    <!--    <groups-by-type-->
    <!--      :restrictions-groups="unavailableGroups"-->
    <!--      type-label="You didn't match these requirements"-->
    <!--      :available="false"-->
    <!--    />-->
  </q-list>
</template>

<script lang="ts">
import { matDangerous as stopIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent, inject } from '@vue/composition-api'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { createCollection } from '@/front/src/composables/trip-cards'
import GroupsByType from '@/front/src/pages/destination/components/restriction-groups/groups-by-type.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: { CountryLabel, GroupsByType, WidgetHeader },
  props: {
    returnRestrictions: {
      type: Boolean,
    },
  },
  setup(props) {
    const rootStore = useRootStore()
    const store = inject(StoreKey) as StoreModule

    const groups = computed(() =>
      createCollection(
        props.returnRestrictions
          ? store.getters.origin
          : store.getters.destination,
        rootStore.getters.visitorContextWithDefaults,
      ),
    )
    const bestAvailableGroup = computed(() => {
      const group = groups.value.getBestGroup()
      return group ? [group] : []
    })
    const availableGroups = computed(() => groups.value.getAvailableGroups())
    const unavailableGroups = computed(() =>
      groups.value.getUnavailableGroups(),
    )

    const originISO = computed(() =>
      props.returnRestrictions
        ? store.state.currentDestinationCode
        : store.state.currentOriginCode,
    )

    const destinationISO = computed(() =>
      props.returnRestrictions
        ? store.state.currentOriginCode
        : store.state.currentDestinationCode,
    )

    return {
      bestAvailableGroup,
      availableGroups,
      unavailableGroups,
      stopIcon,
      originISO,
      destinationISO,
    }
  },
})
</script>
