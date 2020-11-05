<template>
  <div>
    <div :class="['text-h6', `text-${groupColor}`, 'q-pb-md']">
      <q-icon size="md" :name="groupIcon" />
      {{ groupName }}
    </div>
    <q-intersection
      v-for="destination in destinations"
      :key="destination.destinationLabel"
      style="height: 64px"
      transition="fade"
      ssr-prerender
    >
      <destination-item :destination="destination" />
    </q-intersection>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import DestinationItem from 'pages/country/components/destination-item.vue'

import { Restriction } from 'src/api/restrictions/models'

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
