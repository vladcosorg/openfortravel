<template>
  <div>
    <h6 v-if="!item">
      <q-skeleton type="rect" :width="randWidth()" />
    </h6>
    <h6 v-else :id="item.id" class="text-weight-regular">
      <component :is="item.question" />
    </h6>
    <div
      v-if="item"
      :class="[
        { 'active-question': isActive },
        'bg-elevation-1 rounded-borders ',
      ]"
    >
      <div class="q-pa-lg text-subtitle1">
        <component :is="item.answer" />
      </div>
      <div class="text-primary-subtle text-caption bg-elevation-1 q-pa-lg">
        <verbalized-context :origin-factsheet="item.originFactsheet" />
      </div>
    </div>
    <p v-else>
      <q-skeleton
        v-for="num in randRows()"
        :key="num"
        :width="randWidth()"
        type="text"
      />
    </p>
  </div>
</template>

<style lang="sass" scoped>
.active-question
  border: 2px solid var(--q-accent)
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import OriginContextInline from '@/front/src/components/context-field/origin/origin-context-inline.vue'
import VaccinationContextInline from '@/front/src/components/context-field/vaccination/vaccination-context-inline.vue'
import VerbalizedContext from '@/front/src/pages/destination/components/sections/questions/verbalized-context.vue'
import TheOriginFacet from '@/front/src/pages/destination/components/the-profile-bar/facets/the-origin-facet.vue'
import { Question } from '@/front/src/pages/destination/questions/question'
import { createGeneratorForRandomIntegerInRange } from '@/shared/src/misc/misc'

export default defineComponent({
  components: {
    VerbalizedContext,
    TheOriginFacet,
    OriginContextInline,
    VaccinationContextInline,
  },
  props: {
    item: {
      type: Object as PropType<Question>,
      default: undefined,
    },
    isActive: {
      type: Boolean,
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
