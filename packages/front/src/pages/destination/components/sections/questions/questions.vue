<template>
  <div
    class="row q-col-gutter-x-xl"
    itemscope
    itemtype="https://schema.org/FAQPage"
  >
    <question-index class="col-5" />
    <div class="col q-gutter-y-lg">
      <question-item
        v-for="(item, index) in questions"
        :key="index"
        itemscope
        itemprop="mainEntity"
        itemtype="https://schema.org/Question"
        :item="item"
        :is-last="lastIndex === index"
        :is-active="
          activeQuestionHash && item && activeQuestionHash === item.id
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useRoute } from 'vue-router'

import QuestionIndex from '@/front/src/pages/destination/components/sections/questions/question-index.vue'
import QuestionItem from '@/front/src/pages/destination/components/sections/questions/question-item.vue'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { Question } from '@/front/src/pages/destination/questions/question'

export default defineComponent({
  components: { QuestionIndex, QuestionItem },
  setup() {
    const store = inject(StoreKey) as StoreModule
    const isLoading = computed(() => store.getters.restrictionsLoading)
    const activeQuestionHash = computed(() => {
      const hash = useRoute().hash
      return hash.length > 0 ? hash.slice(1) : undefined
    })

    const questions = computed<Question[]>(() => {
      if (isLoading.value) {
        return Array.from({ length: 3 })
      }
      return store.getters.questions
    })

    const lastIndex = computed(() => questions.value.length - 1)

    return {
      questions,
      activeQuestionHash,
      lastIndex,
    }
  },
})
</script>
