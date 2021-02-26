<template>
  <section>
    <h3 class="q-pb-lg">{{ $t('faq.title') }}</h3>
    <div class="q-gutter-lg">
      <question-item
        v-for="(item, index) in questions"
        :key="index"
        :item="item"
        :is-last="lastIndex === index"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import QuestionItem from '@/front/src/pages/destination/components/question-item.vue'
import { getQuestions } from '@/front/src/pages/destination/destination-questions'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { QuestionItem },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    destination: {
      type: Object as PropType<Destination>,
      required: true,
    },
    restriction: {
      type: Object as PropType<Restriction>,
      required: true,
    },
  },
  setup(props) {
    const questions = computed(() => {
      if (props.isLoading) {
        return Array.from({ length: 3 })
      }

      return getQuestions(props.restriction, props.destination)
    })

    const lastIndex = computed(() => questions.value.length - 1)

    return {
      questions,
      lastIndex,
    }
  },
})
</script>
