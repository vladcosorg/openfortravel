<template>
  <div>
    <q-card
      flat
      class="bg-elevation-11 rounded-borders full-height"
      style="border: 1px solid rgb(38 43 49)"
    >
      <q-card-section class="full-height row">
        <div class="text-h6 text-capitalize">{{ title }}</div>
        <div class="text-subtitle2 text-primary-subtle q-mb-sm">
          {{ subtitle }}
        </div>

        <div class="text-h6 full-width self-end">
          <span :class="['text-h2  relative-position', colorClass]">
            {{ animatedCount.toFixed(0) }}
          </span>
          countries
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { useTransition } from '@vueuse/core'
import { computed, defineComponent, ref, watch, onMounted } from 'vue'

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
    // const isLoading = computed(() => props.count === undefined)
    const isLoading = computed(() => true)
    const internalCount = ref(0)

    watch(
      () => props.count,
      (newCount) => {
        internalCount.value = 0
        if (newCount) {
          internalCount.value = newCount
        }
      },
    )

    onMounted(() => (internalCount.value = props.count ?? 0))

    const animatedCount = useTransition(internalCount, {
      duration: 1500,
      transition: [0.75, 0, 0.25, 1],
    })
    return { isLoading, animatedCount }
  },
})
</script>
