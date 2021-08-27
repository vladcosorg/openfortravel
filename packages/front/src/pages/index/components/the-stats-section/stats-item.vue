<template>
  <div>
    <div
      class="q-px-md q-py-lg rounded-borders fit"
      style="background-color: #39579d"
    >
      <h6>{{ $t(`misc.stats.categories.${type}.title`) }}</h6>

      <div
        :class="[
          'lh-1 q-pa-md q-mb-sm text-primary-inverse rounded-borders',
          `bg-${color}`,
        ]"
        :style="{
          marginTop: 'auto',
          marginLeft: '-16px',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
        }"
      >
        <span class="text-h1 block lh-1" style="font-weight: bold">
          {{ animatedCount.toFixed(0) }}
        </span>
        <span
          class="lh-base"
          v-html="$t(`misc.stats.categories.${type}.longSuffix`)"
        />
      </div>
      <div class="q-mb-md">
        {{ $t(`misc.stats.categories.${type}.longSubtitle`) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRef } from 'vue'

import { useStatCountTransition } from '@/front/src/modules/stats/composable'
import { StatCategory, statColor } from '@/front/src/modules/stats/model'

const props = defineProps({
  type: {
    type: String as PropType<StatCategory>,
    required: true,
  },
  count: {
    type: Number,
  },
})

const color = statColor[props.type]
const { count: animatedCount } = useStatCountTransition(toRef(props, 'count'))
</script>
