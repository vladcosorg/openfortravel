<template>
  <q-item
    v-ripple
    clickable
    :to="{
      name: 'destination',
      params: {
        originCode: origin.countryCode,
        destinationCode: destination.countryCode,
      },
    }"
  >
    <q-item-section avatar>
      <q-avatar>
        <flag
          png
          :class="$style.flag"
          :country-code="destination.countryCode"
        />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-blue-grey-2 text-weight-bold">
        {{ destination.countryLabel }}
      </q-item-label>
      <q-item-label
        caption
        class="text-blue-grey-2 ellipsis-2-lines"
        v-html="description"
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
import {
  computed,
  defineComponent,
  inject,
  PropType,
  Ref,
} from '@vue/composition-api'

import { Destination } from 'src/api/destinations'
import Flag from 'src/components/flag.vue'
import { getShortDescription } from 'src/models/description'
import { Origin } from 'src/models/origin'

export default defineComponent({
  components: { Flag },
  props: {
    dest: {
      required: true,
      type: Object as PropType<Destination>,
    },
  },
  setup(prop) {
    const origin = inject<Ref<Origin>>('origin')

    if (!origin) {
      throw new Error('Missing origin injection')
    }

    const destination = prop.dest
    const description = computed(() =>
      getShortDescription(origin.value, destination),
    )

    return { destination, origin, description }
  },
})
</script>
