<template>
  <landing-section>
    <template #title>
      <span class="text-accent">Travel advisory</span> that your customers can
      rely upon
    </template>
    <template #subtitle>
      Thanks to our custom-build AI bot and a department of trained personell,
      we are able to push
      <span class="text-dotted-underline text-secondary"
        >verified<q-tooltip
          >Per our standards the information is considered verified, if our
          human operator can confirm its corectness by cross-referencing several
          sources or after confirmation from the embassy personell.</q-tooltip
        ></span
      >
      updates to our customers at most
      <b>30 minutes</b>
      about the publication of the updated travel restrictions.
    </template>
    <template #content>
      <div class="q-gutter-y-sm text-h6">
        <div class="row items-center q-gutter-x-md no-wrap">
          <q-icon class="col-auto" size="30px" color="positive" :name="icon" />
          <span>Mandatory verification & approval by trained staff</span>
        </div>
        <div class="row items-center q-gutter-x-md no-wrap">
          <q-icon class="col-auto" size="30px" color="positive" :name="icon" />
          <span>Frequent checks (~7 verifications / day)</span>
        </div>
        <div class="row items-center q-gutter-x-md no-wrap">
          <q-icon class="col-auto" size="30px" color="positive" :name="icon" />
          <span>All countries are tracked. No exceptions.</span>
        </div>
        <div class="row items-center q-gutter-x-md no-wrap">
          <q-icon class="col-auto" size="30px" color="positive" :name="icon" />
          <span
            >An AI bot trained to detect and extract relevant restrictions</span
          >
        </div>
      </div>
    </template>
    <template #featured-content>
      <div
        v-intersection="intersectionConfig"
        class="
          q-gutter-y-lg
          overflow-hidden-y overflow
          order-last
          flex-dependent-height-sm
        "
      >
        <transition-group
          name="flip-list"
          appear
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOut"
        >
          <data-item
            v-for="item in items"
            :key="item.country"
            v-bind="item"
            :visible="visible"
            @done="onDone"
          />
        </transition-group>
      </div>
    </template>
  </landing-section>
</template>

<style lang="scss" scoped>
.overflow {
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0.2) 85%,
    rgba(0, 0, 0, 0.01) 95%,
    rgba(0, 0, 0, 0) 100%
  );
}

.flip-list-move {
  transition: transform 0.5s ease;
}
</style>

<script lang="ts">
import LandingSection from '@/front/src/components/section-elements/landing-section.vue'

export type ItemStatus = 'nochange' | 'haschange' | 'checking'
import { matDone as icon } from '@quasar/extras/material-icons'
import { watchOnce } from '@vueuse/core'
import { defineComponent, ref } from 'vue'

import DataItem from '@/front/src/pages/business/components/the-featured-data/data-item.vue'
import { seededRandom } from '@/shared/src/misc/random'
import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { LandingSection, DataItem },
  setup() {
    const visible = ref(false)
    const intersectionConfig = {
      handler: (entry: IntersectionObserverEntry) => {
        visible.value = entry.isIntersecting
      },
      cfg: {
        threshold: 0.2,
      },
    }

    watchOnce(visible, () => {
      items.value.unshift(createItem('checking', 0))
    })

    const countryList = getCountryCodes()
    const initialStatuses: ItemStatus[] = ['haschange', 'nochange', 'nochange']
    let index = 0
    const createItem = (status = 'checking', timeExponent = 100_000) => {
      index++
      return {
        country: countryList[seededRandom(countryList.length, index + 51)],
        status: status,
        time: new Date(Date.now() - timeExponent * index),
      }
    }
    const items = ref(initialStatuses.map((status) => createItem(status)))

    const onDone = (payload: ItemStatus) => {
      items.value[0].status = payload
      items.value.unshift(createItem('checking', 0))
      items.value.pop()
    }

    return { items, onDone, icon, intersectionConfig, visible }
  },
})
</script>
