<template>
  <q-item
    v-ripple
    :class="[$style.item, 'rounded-borders']"
    clickable
    :to="{
      name: 'destination',
      params: {
        originCode: destination.origin,
        destinationCode: destination.destination,
      },
    }"
  >
    <flag png :class="$style.bg" :country-code="destination.destination" />
    <q-item-section avatar>
      <q-avatar>
        <flag
          png
          :class="$style.flag"
          :country-code="destination.destination"
        />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="[$style.label, 'ellipsis-improved', 'full-width']"
        style=""
        class=""
      >
        {{ destination.destinationLabel }}
      </q-item-label>
      <q-item-label
        caption
        class="text-blue-grey-2 ellipsis-3-lines"
        v-html="destination.shortDescription"
      />
    </q-item-section>
  </q-item>
</template>
<style lang="scss" module>
.label {
  font-size: 1rem;
  font-weight: 400;
}
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: grayscale(10%) opacity(10%) blur(5px);
  object-fit: cover;
  image-rendering: pixelated;
}
.item {
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  border: 1px solid darken($primary, 2%);
}

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
  setup() {
    return {
      getBg(countryCode) {
        return require(`svg-country-flags/svg/${countryCode}.svg`)
      },
    }
  },
})
</script>
