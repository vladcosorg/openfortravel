<template>
  <q-list class="rounded-borders">
    <q-item-label v-if="showHeader" header :class="[`text-${groupColor}`]">
      <q-icon size="sm" :name="groupIcon" />
      {{ groupName }}
    </q-item-label>
    <q-intersection
      v-for="(destination, index) in items"
      :key="index"
      style="min-height: 95px"
      transition="fade"
      class="q-mb-md"
      ssr-prerender
    >
      <destination-item :loading="loading" :destination="destination" />
    </q-intersection>
  </q-list>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import { Restriction } from '@/front/src/api/restrictions/models'
import DestinationItem from '@/front/src/pages/country/components/destination-item.vue'

export default defineComponent({
  components: { DestinationItem },
  props: {
    loading: {
      required: false,
      type: Boolean,
    },
    groupName: {
      required: false,
      type: String,
    },
    groupIcon: {
      required: false,
      type: String,
    },
    groupColor: {
      required: false,
      type: String,
    },
    showHeader: {
      required: false,
      type: Boolean,
      default: true,
    },
    destinations: {
      type: Array as PropType<Restriction[]>,
      required: false,
    },
  },
  setup(props) {
    const itemsRef = computed(() => {
      if (!props.loading) {
        return props.destinations
      }

      return new Array(5)
    })

    return {
      items: itemsRef,
    }
  },
})
</script>
