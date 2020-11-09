<template>
  <q-list class="rounded-borders">
    <q-item-label header :class="[`text-${groupColor}`]">
      <q-icon size="sm" :name="groupIcon" />
      {{ groupName }}
    </q-item-label>
    <q-intersection
      v-for="destination in destinations"
      :key="destination.destinationLabel"
      style="min-height: 95px"
      transition="fade"
      class="q-mb-md"
      ssr-prerender
    >
      <destination-item :group-color="groupColor" :destination="destination" />
    </q-intersection>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { Restriction } from 'src/api/restrictions/models'
import DestinationItem from 'src/pages/country/components/destination-item.vue'

export default defineComponent({
  components: { DestinationItem },
  props: {
    groupName: {
      required: true,
      type: String,
    },
    groupIcon: {
      required: true,
      type: String,
    },
    groupColor: {
      required: true,
      type: String,
    },
    destinations: {
      type: Array as PropType<Restriction[]>,
    },
  },
})
</script>
