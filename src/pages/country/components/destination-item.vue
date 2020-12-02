<template>
  <q-no-ssr>
    <template #default>
      <q-item v-if="loading" :class="[$style.item, 'rounded-borders']">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" height="1.8rem" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="90%" height="10px" />
            <q-skeleton type="text" height="10px" />
            <q-skeleton type="text" height="10px" width="75%" />
          </q-item-label>
          <q-item-label class="q-gutter-xs row">
            <q-skeleton
              v-for="cnt in 3"
              :key="cnt"
              type="QBadge"
              height="0.9rem"
              width="3rem"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        v-else
        v-ripple
        :class="[$style.item, destination.status, 'rounded-borders']"
        clickable
        :to="{
          name: 'destination',
          params: {
            originSlug: destination.originSlug,
            destinationSlug: destination.destinationSlug,
          },
        }"
        @click.native="isClicked = true"
      >
        <transition appear enter-active-class="animated fadeIn">
          <flag
            type="blurry"
            :class="$style.bg"
            :country-code="destination.destination"
          />
        </transition>

        <q-item-section avatar>
          <q-avatar>
            <flag
              type="responsive"
              :class="$style.flag"
              :country-code="destination.destination"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="returning" :class="[$style.label, 'full-width']">
            {{ destination.originLabel }} → {{ destination.destinationLabel }}
          </q-item-label>
          <q-item-label
            v-else
            :class="[$style.label, 'ellipsis-improved', 'full-width']"
          >
            {{ destination.destinationLabel }}
          </q-item-label>
          <q-item-label
            caption
            class="text-blue-grey-2 ellipsis-3-lines"
            v-html="
              returning
                ? destination.returnShortDescription
                : destination.shortDescription
            "
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
            <q-badge
              v-if="destination.needsSelfIsolation()"
              color="deep-purple"
            >
              {{ $t('restriction.selfIsolation.label') }}
            </q-badge>
            <q-badge v-if="destination.testRequired" color="deep-purple">
              {{ $t('restriction.testing.label') }}
            </q-badge>
          </q-item-label>
        </q-item-section>
        <q-inner-loading :showing="isClicked" />
      </q-item>
    </template>
    <template #placeholder>
      <router-link
        :to="{
          name: 'destination',
          params: {
            originSlug: destination.originSlug,
            destinationSlug: destination.destinationSlug,
          },
        }"
      >
        {{ destination.destinationLabel }}
      </router-link>
    </template>
  </q-no-ssr>
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
  filter: grayscale(10%) opacity(20%);
  object-fit: fill;
}

.item {
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  border: 2px solid rgba($grey, 0.3);

  &:global(.allowed) {
    border: 2px solid rgba($positive, 0.3);
  }

  &:global(.conditional) {
    border: 2px solid rgba($warning, 0.3);
  }

  &:global(.forbidden) {
    border: 2px solid rgba($negative, 0.3);
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
import { defineComponent, PropType, ref } from '@vue/composition-api'

import { Restriction } from 'src/api/restrictions/models'
import Flag from 'src/components/flag.vue'

export default defineComponent({
  components: { Flag },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    returning: {
      type: Boolean,
      default: false,
    },
    destination: {
      type: Object as PropType<Restriction>,
    },
  },

  setup() {
    return {
      isClicked: ref(false),
      icon,
    }
  },
})
</script>
