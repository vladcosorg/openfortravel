<template>
  <news-card
    class="col-4"
    unsplash-id="1612277795421-9bc7706a4a34"
    :to="item.to"
  >
    <template #title>
      {{ item.title }}
    </template>
  </news-card>
</template>

<script lang="ts" setup>
import { computed, toRef } from 'vue'

import { useBlogTitle } from '@/front/src/pages/news/composables'
import NewsCard from '@/front/src/pages/news/news-card.vue'
import { getTravelAlertsURL } from '@/front/src/pages/news/router'

const props = defineProps({
  originIso: {
    type: String,
  },
})
const originIso = toRef(props, 'originIso')
const item = computed(() => ({
  to: getTravelAlertsURL({ originSlug: props.originIso }),
  title: useBlogTitle(originIso).value,
}))
</script>
