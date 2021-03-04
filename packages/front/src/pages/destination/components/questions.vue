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
      />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import QuestionItem from '@/front/src/pages/destination/components/question-item.vue'
import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'
import { useVuexRawGetter } from '@/shared/src/composables/use-vuex'
import { Question } from '@/front/src/pages/destination/questions/question'

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
  setup(props) {
    const questions = computed(() => {
      if (props.isLoading || !props.restriction || !props.destination) {
        return Array.from({ length: 3 })
      }

      return useVuexRawGetter<Question[]>('destinationPage/questions')
    })

    const lastIndex = computed(() => questions.value.length - 1)

    return {
      questions,
      lastIndex,
    }
  },
})
</script>
