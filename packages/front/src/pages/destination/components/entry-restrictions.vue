<template>
  <q-list :class="['text-subtitle1']">
    <widget-header>
      <template v-if="returnRestrictions" #title
        ><div>Return travel</div></template
      >
      <template v-else #title> Outgoing travel </template>

      <template #subtitle>
        {{ returnRestrictions ? 'returning' : 'travelling' }} from
        <country-label :value="originISO" /> to
        <country-label :value="destinationISO" />
      </template>
    </widget-header>
    <category-switcher
      v-model="currentRestrictionCategory"
      :available-count="availableGroups.length"
      :unavailable-count="unavailableGroups.length"
    />
    <groups-by-type
      v-if="currentGroupList.length > 0"
      :restrictions-groups="currentGroupList"
      :show-header="
        currentRestrictionCategory !== RestrictionListType.BEST_OPTION
      "
      :type-label="
        currentRestrictionCategory !== RestrictionListType.ALL_UNAVAILABLE
          ? 'Available'
          : 'Unavailable'
      "
      :available="
        currentRestrictionCategory !== RestrictionListType.ALL_UNAVAILABLE
      "
    />
    <q-item
      v-else-if="
        currentRestrictionCategory === RestrictionListType.BEST_OPTION &&
        currentGroupList.length === 0
      "
      class="rounded-borders bg-elevation-1 q-py-md q-my-md bg-negative"
    >
      <q-item-section avatar top class="justify-center">
        <q-icon :name="stopIcon" color="primary-inverse" size="xl" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-primary-inverse">
          According to available information you cannot visit
          <country-label :value="destinationISO" /> at this time.</q-item-label
        >
        <q-item-label caption class="text-primary-inverse">
          Some exceptions may apply if you have a
          <b class="text-dotted-underline"
            >special status<q-tooltip>
              Transport crew members, onboard transport staff, cross-border
              workers entering and leaving Italy for proven reasons of work,
              pupils and students, officials and agents of the European Union
            </q-tooltip></b
          >
          or
          <b class="text-dotted-underline"
            >special circumstances<q-tooltip
              >Urgent health reasons, death of a relative, etc<q-tooltip /></q-tooltip></b
          >. Please contact the embassy of
          <country-label :value="destinationISO" /> for advice.</q-item-label
        >
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { matDangerous as stopIcon } from '@quasar/extras/material-icons'
import { computed, defineComponent, inject, ref } from 'vue'

import CountryLabel from '@/front/src/components/country/country-label.vue'
import { createCollection } from '@/front/src/composables/trip-cards'
import CategorySwitcher from '@/front/src/pages/destination/components/category-switcher.vue'
import GroupsByType from '@/front/src/pages/destination/components/restriction-groups/groups-by-type.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { useRootStore } from '@/shared/src/composables/use-plugins'

export enum RestrictionListType {
  BEST_OPTION = 'best-option',
  ALL_AVAILABLE = 'all-available',
  ALL_UNAVAILABLE = 'all-unavailable',
}

export default defineComponent({
  components: {
    CategorySwitcher,
    CountryLabel,
    GroupsByType,
    WidgetHeader,
  },
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
        ? store.getters.currentDestinationCode
        : store.getters.currentOriginCode,
    )

    const destinationISO = computed(() =>
      props.returnRestrictions
        ? store.getters.currentOriginCode
        : store.getters.currentDestinationCode,
    )

    const currentRestrictionCategory = ref<RestrictionListType>(
      RestrictionListType.BEST_OPTION,
    )

    const currentGroupList = computed(() => {
      switch (currentRestrictionCategory.value) {
        case RestrictionListType.ALL_AVAILABLE:
          return availableGroups.value

        case RestrictionListType.ALL_UNAVAILABLE:
          return unavailableGroups.value
      }

      return bestAvailableGroup.value
    })

    return {
      RestrictionListType,
      currentGroupList,
      currentRestrictionCategory,
      availableGroups,
      unavailableGroups,
      stopIcon,
      originISO,
      destinationISO,
    }
  },
})
</script>
