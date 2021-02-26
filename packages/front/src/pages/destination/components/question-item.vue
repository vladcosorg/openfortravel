<template>
  <div>
    <h6 v-if="!item"><q-skeleton type="rect" :width="randWidth()" /></h6>
    <h6 v-else :id="item.id">{{ item.question }}</h6>
    <div>
      <p v-if="!item" class="text-subtitle1">
        <q-skeleton
          v-for="num in randRows()"
          :key="num"
          :width="randWidth()"
          type="text"
        />
      </p>
      <p v-else class="text-subtitle1" v-html="item.answer" />
    </div>
    <q-separator v-if="!isLast" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { Question } from '@/front/src/pages/destination/questions/question'
import { createGeneratorForRandomIntegerInRange } from '@/shared/src/misc/misc'

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
  },
  setup() {
    return {
      randWidth: createGeneratorForRandomIntegerInRange(50, 80, '%'),
      randRows: createGeneratorForRandomIntegerInRange(1, 4),
    }
  },
})
</script>
