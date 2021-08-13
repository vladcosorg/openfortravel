<template>
  <q-page :class="['column']">
    <section class="container q-my-lg">
      <h3 class="text-bold text-center">COVID-19 Travel Wizard</h3>
      <div class="text-subtitle1 text-center">
        Attenion! All the data below is stored in your browser only and is not
        accessible to us or anyone else.<br />
        Additionally, you are free to skip any step that you would not like
        share. The search will still work, though it will be less accurate.
      </div>
      <div class="text-center q-mt-md">
        <q-btn
          v-if="step === 1"
          color="secondary"
          text-color="primary-inverse"
          size="lg"
          label="Start"
          @click="step = 2"
        />
      </div>

      <div v-if="step > 1" class="row justify-center">
        <guide />
      </div>
    </section>
  </q-page>
</template>

<style lang="scss" module>
.stepper {
  background: none;
  :global {
    .q-stepper__tab {
      padding: 12px 0;
    }
    .q-stepper__step-inner {
      padding-left: 35px;
    }
    .q-stepper__dot {
      font-size: 1.5rem;
      line-height: 0;
      min-width: 40px;
      width: 40px;
      height: 40px;
    }
    .q-stepper__title {
      font-size: 1.2rem;
      line-height: 1.3em;
    }
  }
}
</style>

<script lang="ts">
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'
import {
  matDone as doneIcon,
  matEdit as editIcon,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, ref } from 'vue'

import Guide from '@/front/src/pages/guide/components/guide.vue'
import StepCitizenship from '@/front/src/pages/guide/steps/step-citizenship.vue'
import StepFinal from '@/front/src/pages/guide/steps/step-final.vue'
import StepOrigin from '@/front/src/pages/guide/steps/step-origin.vue'
import StepRecovery from '@/front/src/pages/guide/steps/step-recovery.vue'
import StepVaccination from '@/front/src/pages/guide/steps/step-vaccination.vue'
import StepVisited from '@/front/src/pages/guide/steps/step-visited.vue'

export default defineComponent({
  components: {
    Guide,
    StepFinal,
    StepVisited,
    StepRecovery,
    StepVaccination,
    StepCitizenship,
    StepOrigin,
  },
  props: {},
  setup() {
    const step = ref(2)
    const store = useRootStore()

    const showRecoveryStep = computed(
      () => !store.state.visitorContext[RestrictionNodeType.VACCINATED],
    )

    return {
      step,
      showRecoveryStep,
      doneIcon,
      editIcon,
    }
  },
})
</script>
