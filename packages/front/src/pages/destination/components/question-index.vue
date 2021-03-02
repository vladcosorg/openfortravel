<template>
  <section>
    <widget-header :title="$t('page.destination.widgets.faqIndex.title')" />
    <ol class="q-mt-md">
      <li v-for="(question, index) in questions" :key="index">
        <a v-if="question" :href="question.url" v-html="question.title" />
        <q-skeleton v-else :key="index" width="60%" type="text" />
      </li>
    </ol>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import { getQuestions } from '@/front/src/pages/destination/destination-questions'
import { getCurrentURL } from '@/front/src/router/helpers'
import { Destination } from '@/shared/src/api/destinations/models'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: { WidgetHeader },
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

      return getQuestions(props.restriction, props.destination).map(
        (question) => ({
          title: question.question,
          url: getCurrentURL(question.id),
        }),
      )
    })

    const lastIndex = computed(() => questions.value.length - 1)

    return {
      questions,
      lastIndex,
    }
  },
})
</script>
