<template>
  <q-item-section
    key="content"
    :class="`bg-${color}
      text-primary-inverse
        rounded-borders
        q-pa-md
        text-subtitle1
        inset-shadow-down`"
  >
    <q-item-label class="text-h5 q-mb-sm"
      ><country-label :value="country"
    /></q-item-label>
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

import CountryLabel from '@/front/src/components/country/country-label.vue'
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
