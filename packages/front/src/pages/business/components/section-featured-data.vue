<template>
  <section class="section relative-position bg">
    <div class="container-roomy">
      <div class="row q-col-gutter-xl">
        <div
          v-intersection="intersectionConfig"
          class="
            col-12 col-md
            q-gutter-y-lg
            overflow-hidden-y overflow
            order-last order-md-first
          "
          style="height: 500px"
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
        <div class="col-12 col-md-6 q-gutter-y-xl">
          <div class="q-gutter-md">
            <h2>Data that you and your customers can rely upon</h2>
            <h5 class="text-primary-subtle">
              We’re always looking to understand how we can help our customers
              make the best use of Hasura. Our sales team would love to set up a
              call/chat.
            </h5>
          </div>
          <div class="q-gutter-y-sm text-h6">
            <div class="row items-center q-gutter-x-md no-wrap">
              <q-icon
                class="col-auto"
                size="30px"
                color="positive"
                :name="icon"
              />
              <span>Mandatory approval by a human operator</span>
            </div>
            <div class="row items-center q-gutter-x-md no-wrap">
              <q-icon
                class="col-auto"
                size="30px"
                color="positive"
                :name="icon"
              />
              <span>Frequent checks (~7 verifications / day)</span>
            </div>
            <div class="row items-center q-gutter-x-md no-wrap">
              <q-icon
                class="col-auto"
                size="30px"
                color="positive"
                :name="icon"
              />
              <span
                >An AI bot trained to detect and extract relevant
                restrictions</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bg {
  background-color: #1d2a4b;
}
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
export type ItemStatus = 'nochange' | 'haschange' | 'checking'
import { matDone as icon } from '@quasar/extras/material-icons'
import { watchOnce } from '@vueuse/core'
import { defineComponent, ref } from 'vue'

import DataItem from '@/front/src/pages/business/components/the-featured-data/data-item.vue'
import { seededRandom } from '@/shared/src/misc/random'
import { getCountryCodes } from '@/shared/src/modules/country-list/country-list-helpers'

export default defineComponent({
  components: { DataItem },
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
        country: countryList[seededRandom(countryList.length, index + 30)],
        status: status,
        time: new Date(Date.now() - timeExponent * index),
      }
    }
    const items = ref(initialStatuses.map((status) => createItem(status)))

    const onDone = (payload) => {
      items.value[0].status = payload
      items.value.unshift(createItem('checking', 0))
      items.value.pop()
    }

    return { items, onDone, icon, intersectionConfig, visible }
  },
})
</script>
