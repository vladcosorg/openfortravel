<template>
  <div>
    <widget-header>
      <template #title>Common questions</template>
    </widget-header>
    <div class="q-mt-md text-subtitle1 q-gutter-sm">
      <div v-for="(question, index) in questions" :key="index">
        <a v-if="question" :href="question.url">
          <component :is="question.title" />
        </a>
        <q-skeleton v-else :key="index" width="60%" type="text" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import WidgetHeader from '@/front/src/pages/destination/components/widget-header.vue'
import type { StoreModule } from '@/front/src/pages/destination/destination-store'
import { StoreKey } from '@/front/src/pages/destination/destination-types'
import { getCurrentRelativeURL } from '@/front/src/router/helpers'

export default defineComponent({
  components: { WidgetHeader },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const store = inject(StoreKey) as StoreModule
    const questions = computed(() =>
      // if (props.isLoading || !props.restriction || !props.destination) {
      //   return Array.from({ length: 3 })
      // }

      store.getters.questions.map((question) => ({
        title: question.question,
        url: getCurrentRelativeURL(question.id),
      })),
    )

    const lastIndex = computed(() => questions.value.length - 1)

    return {
      questions,
      lastIndex,
    }
  },
})
</script>
