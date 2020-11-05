<template>
  <q-item
    v-ripple
    clickable
    :to="{
      name: 'destination',
      params: {
        originCode: destination.origin,
        destinationCode: destination.destination,
      },
    }"
  >
    <q-item-section avatar>
      <q-avatar>
        <flag png :class="$style.flag" :country-code="destination.destination" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-blue-grey-2 text-weight-bold">
        {{ destination.destinationLabel }}
      </q-item-label>
      <q-item-label
        caption
        class="text-blue-grey-2 ellipsis-2-lines"
        v-html="destination.shortDescription"
      />
    </q-item-section>
  </q-item>
</template>
<style module>
.flag {
  width: 50px;
  height: 50px;
  object-fit: cover;
  image-rendering: pixelated;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { Restriction } from 'src/api/restrictions/models'
import Flag from 'src/components/flag.vue'

export default defineComponent({
  components: { Flag },
  props: {
    destination: {
      required: true,
      type: Object as PropType<Restriction>,
    },
  },
})
</script>
