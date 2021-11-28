<template>
  <q-item-section
    :class="`bg-${color}
    justify-between
      text-primary-inverse
        rounded-borders
        q-pa-md
        text-subtitle1
        inset-shadow-down`"
  >
    <q-item-label class="row items-center">
      <flag
        height="45px"
        width="60px"
        :country-code="country"
        class="rounded-borders col-auto q-mr-md"
      />
      <div class="col">
        <country-label class="block text-h5 ellipsis" :value="country" />
        <continent-label
          class="block text-caption"
          :value="country"
          from-country
        />
      </div>
    </q-item-label>
    <q-separator :dark="false" class="q-my-md" />
    <the-progress
      :human-name="humanName"
      :time="time"
      :visible="visible"
      :status="status"
      v-bind="$attrs"
    />
  </q-item-section>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

import ContinentLabel from '@/front/src/components/continent-label.vue'
import CountryLabel from '@/front/src/components/country/country-label.vue'
import Flag from '@/front/src/components/flag.vue'
import { ItemStatus } from '@/front/src/pages/business/components/section-featured-data.vue'
import TheProgress from '@/front/src/pages/business/components/the-featured-data/sample-item/the-progress.vue'

const props = defineProps<{
  humanName: string
  time: Date
  visible: boolean
  status: ItemStatus
  country: string
}>()

const color = computed(() => {
  if (props.status === 'nochange') {
    return 'positive'
  }
  if (props.status === 'haschange') {
    return 'info'
  }

  return 'primary'
})
</script>
