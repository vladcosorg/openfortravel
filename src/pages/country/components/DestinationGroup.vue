<template>
  <div v-if="destinations">
    <div :class="['text-h6', `text-${groupColor}`, 'q-pb-md']">
      <q-icon size="md" :name="groupIcon" />
      {{ groupName }}
    </div>
    <q-list bordered>
      <div v-for="destination in destinations" :key="destination.country.code">
        <destination-item :destination="destination" />
        <q-separator />
      </div>
    </q-list>
  </div>
</template>

<style lang="scss"></style>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { FormattedDestinationCountry } from 'components/models'
import { getFlagForCountryCode } from 'src/misc/I18nCountryList'
import DestinationItem from 'pages/country/components/DestinationItem.vue'

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
      type: Array as PropType<FormattedDestinationCountry[]>,
    },
  },
  setup() {
    return { getFlagForCountryCode }
  },
})
</script>
