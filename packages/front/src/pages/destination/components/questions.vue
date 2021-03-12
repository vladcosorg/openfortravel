<template>
  <section>
    <widget-header
      class="text-center"
      :title="$t('page.destination.widgets.faq.title')"
      :subtitle="$t('page.destination.widgets.faq.subtitle')"
    />
    <div class="q-gutter-lg q-mt-md">
      <question-item
        v-for="(item, index) in questions"
        :key="index"
        :item="item"
        :is-last="lastIndex === index"
        :is-active="
          activeQuestionHash && item && activeQuestionHash === item.id
        "
      />
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
} from '@vue/composition-api'

import QuestionItem from '@/front/src/pages/destination/components/question-item.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { Question } from '@/front/src/pages/destination/questions/question'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { WidgetHeader, QuestionItem },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    destination: {
      type: Object as PropType<Destination>,
    },
    restriction: {
      type: Object as PropType<Restriction>,
    },
  },
  setup(props, { root }) {
    const store = inject(StoreKey) as StoreModule
    const activeQuestionHash = computed(() => {
      const hash = root.$route.hash
      return hash.length > 0 ? hash.slice(1) : undefined
    })

    const questions = computed<Question[]>(() => {
      if (props.isLoading || !props.restriction || !props.destination) {
        return Array.from({ length: 3 })
      }
      return store.getters.questions
    })

    const lastIndex = computed(() => questions.value.length - 1)

    return {
      activeQuestionHash,
      questions,
      lastIndex,
    }
  },
})
</script>
