<template>
  <section>
    <h3 class="q-pb-lg">Questions & Answers</h3>
    <div class="q-gutter-lg">
      <div v-for="(item, index) in questions" :key="index">
        <h6>{{ item.question }}</h6>
        <div>
          <p class="text-subtitle1" v-html="item.answer" />
        </div>
        <q-separator />
      </div>
    </div>
  </section>
</template>

<style lang="scss" module></style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

import { canITravelToCountry } from '@/front/src/models/faq'
import { Restriction } from '@/shared/src/api/restrictions/models'

export default defineComponent({
  components: {},
  props: {
    restriction: {
      type: Object as PropType<Restriction>,
      required: true,
    },
  },
  setup(props) {
    const questions = computed(() => [canITravelToCountry(props.restriction)])

    return {
      questions,
    }
  },
})
</script>
