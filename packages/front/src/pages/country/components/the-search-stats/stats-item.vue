<template>
  <div>
    <q-card flat class="bg-elevation-1 full-height">
      <q-card-section class="full-height row">
        <div class="text-h6 text-capitalize">{{ title }}</div>
        <div class="text-subtitle2 text-primary-subtle q-mb-sm">
          {{ subtitle }}
        </div>

        <div class="text-h6 full-width self-end">
          <q-skeleton
            v-if="isLoading"
            class="block"
            animation="blink"
            type="text"
            width="70%"
            height="3rem"
          />
          <template v-else>
            <span :class="['text-h2', colorClass]">{{ count }}</span> countries
          </template>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
    },
    colorClass: {
      type: String,
    },
  },
  setup(props) {
    const isLoading = computed(() => props.count === undefined)
    return { isLoading }
  },
})
</script>
