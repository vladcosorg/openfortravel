<template>
  <div class="q-mb-lg">
    <h5 class="text-capitalize no-margin text-bold">
      <slot name="title">{{ title }}</slot>
    </h5>
    <div v-if="subtitle || $slots.subtitle" class="text-subtitle1 text-grey-5">
      <slot name="subtitle">{{ subtitle }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import isLoadingMixin from '@/front/src/mixins/is-loading.vue'

export default defineComponent({
  components: {},
  mixins: [isLoadingMixin],
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
})
</script>
