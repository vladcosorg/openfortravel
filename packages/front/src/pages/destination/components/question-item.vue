<template>
  <div>
    <h6 v-if="!item">
      <q-skeleton type="rect" :width="randWidth()" />
    </h6>
    <h6
      v-else
      :id="item.id"
      class="text-weight-regular"
      v-html="item.question"
    />
    <p
      v-if="item"
      :class="[
        'bg-elevation-1 rounded-borders q-pa-lg',
        { 'text-info': isActive },
      ]"
      v-html="item.answer"
    />
    <p v-else class="bg-elevation-1 rounded-borders q-pa-lg">
      <q-skeleton
        v-for="num in randRows()"
        :key="num"
        :width="randWidth()"
        type="text"
      />
    </p>
  </div>
</template>

<script lang="ts">
import { createGeneratorForRandomIntegerInRange } from '@/shared/src/misc/misc'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import type { Question } from '@/front/src/pages/destination/questions/question'

export default defineComponent({
  components: {},
  props: {
    item: {
      type: Object as PropType<Question>,
      default: undefined,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      randWidth: createGeneratorForRandomIntegerInRange(50, 80, '%'),
      randRows: createGeneratorForRandomIntegerInRange(1, 4),
    }
  },
})
</script>
