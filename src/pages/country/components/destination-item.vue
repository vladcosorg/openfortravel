<template>
  <q-item
    v-ripple
    :class="[$style.item, destination.status, 'rounded-borders']"
    clickable
    :to="{
      name: 'destination',
      params: {
        originCode: destination.origin,
        destinationCode: destination.destination,
      },
    }"
  >
    <transition appear enter-active-class="animated fadeIn">
      <flag png :class="$style.bg" :country-code="destination.destination" />
    </transition>

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
      <q-item-label :class="[$style.label, 'ellipsis-improved', 'full-width']">
        {{ destination.destinationLabel }}
      </q-item-label>
      <q-item-label
        caption
        class="text-blue-grey-2 ellipsis-3-lines"
        v-html="destination.shortDescription"
      />
      <q-item-label class="q-gutter-xs">
        <q-badge
          v-if="destination.status === 'allowed'"
          color="green-14"
          text-color="dark"
        >
          {{ $t('restriction.travel.value')[destination.status] }}
        </q-badge>
        <q-badge
          v-if="destination.status === 'conditional'"
          color="warning"
          text-color="dark"
        >
          {{ $t('restriction.travel.value')[destination.status] }}
        </q-badge>
        <q-badge
          v-if="destination.status === 'forbidden'"
          color="negative"
          text-color="white"
        >
          {{ $t('restriction.travel.value')[destination.status] }}
        </q-badge>
        <!--        <q-badge color="accent" text-color="dark"> COVID test </q-badge>-->
        <q-badge color="deep-purple"> Self-Isolation </q-badge>
      </q-item-label>
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

  &:global(.allowed) {
    border: 2px solid rgba($positive, 0.3s);
  }
  &:global(.conditional) {
    border: 2px solid rgba($warning, 0.3s);
  }
  &:global(.forbidden) {
    border: 2px solid rgba($negative, 0.3s);
  }
}

.flag {
  width: 50px;
  height: 50px;
  object-fit: cover;
  image-rendering: pixelated;
}
</style>

<script lang="ts">
import { ionBaseballOutline as icon } from '@quasar/extras/ionicons-v5'
import { defineComponent, PropType } from '@vue/composition-api'

import { Restriction } from 'src/api/restrictions/models'
import Flag from 'src/components/flag.vue'

export default defineComponent({
  components: { Flag },
  props: {
    groupColor: {
      required: true,
      type: String,
    },
    destination: {
      required: true,
      type: Object as PropType<Restriction>,
    },
  },

  setup() {
    return {
      icon,
    }
  },
})
</script>
