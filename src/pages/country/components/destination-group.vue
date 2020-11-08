<template>
  <div>
    <div :class="['text-h6', `text-${groupColor}`, 'q-pb-md']">
      <q-icon size="md" :name="groupIcon" />
      {{ groupName }}
    </div>
    <q-list class="rounded-borders">
      <q-item-label header>Quick stats</q-item-label>
      <q-intersection
        v-for="destination in destinations"
        :key="destination.destinationLabel"
        style="height: 100px"
        transition="fade"
        class="q-gutter-md"
        ssr-prerender
      >
        <destination-item :destination="destination" />
      </q-intersection>
    </q-list>
  </div>
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
