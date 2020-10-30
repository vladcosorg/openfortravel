<template>
  <div>
    <div :class="['text-h6', `text-${groupColor}`, 'q-pb-md']">
      <q-icon size="md" :name="groupIcon" />
      {{ groupName }}
    </div>
    <q-intersection
      v-for="destination in destinations"
      :key="destination.countryLabel"
      style="height: 64px"
      transition="fade"
      ssr-prerender
    >
      <destination-item :dest="destination" />
    </q-intersection>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import DestinationItem from 'pages/country/components/destination-item.vue'

import { PlainDestination } from 'src/api/destinations'

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
      type: Array as PropType<PlainDestination[]>,
    },
  },
})
</script>
