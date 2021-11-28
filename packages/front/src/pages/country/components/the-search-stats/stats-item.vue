<template>
  <div>
    <q-card
      flat
      class="bg-elevation-1 rounded-borders full-height"
      style="border: 0px solid rgb(38 43 49)"
    >
      <q-card-section class="full-height row">
        <div class="text-h6 text-capitalize col-12">
          {{ $t(`misc.stats.categories.${type}.title`) }}
        </div>
        <div class="text-subtitle2 text-primary-subtle q-mb-sm col-12">
          {{ $t(`misc.stats.categories.${type}.shortSubtitle`) }}
        </div>
        <div
          :class="['text-h6 full-width self-end', !dense ? '' : 'text-normal']"
        >
          <span
            :class="[
              'relative-position',
              `text-${color}`,
              !dense ? 'text-h2' : '',
            ]"
          >
            {{ animatedCount.toFixed(0) }}
          </span>
          countries
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRef } from 'vue'

import { useStatCountTransition } from '@/front/src/modules/stats/composable'
import { StatCategory, statColor } from '@/front/src/modules/stats/model'

const props = defineProps({
  dense: { type: Boolean },
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
