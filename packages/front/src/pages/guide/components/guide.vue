<template>
  <q-stepper
    v-model="step"
    :class="[$style.stepper, 'col-md-6 col-12']"
    vertical
    flat
    inactive-color="primary"
    active-color="accent"
    done-color="secondary"
    :done-icon="doneIcon"
    :inactive-icon="editIcon"
    :active-icon="editIcon"
    header-nav
  >
    <template #default>
      <step-origin :step.sync="step" />
      <step-citizenship :step.sync="step" />
      <step-vaccination :step.sync="step" />
      <step-recovery v-if="showRecoveryStep" :step.sync="step" />
      <step-visited :step.sync="step" />
      <step-final :step.sync="step" />
    </template>
  </q-stepper>
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
import {
  matDone as doneIcon,
  matEdit as editIcon,
} from '@quasar/extras/material-icons'
import { computed, defineComponent, ref } from 'vue'

import StepCitizenship from '@/front/src/pages/guide/steps/step-citizenship.vue'
import StepFinal from '@/front/src/pages/guide/steps/step-final.vue'
import StepOrigin from '@/front/src/pages/guide/steps/step-origin.vue'
import StepRecovery from '@/front/src/pages/guide/steps/step-recovery.vue'
import StepVaccination from '@/front/src/pages/guide/steps/step-vaccination.vue'
import StepVisited from '@/front/src/pages/guide/steps/step-visited.vue'
import { useRootStore } from '@/shared/src/composables/use-plugins'
import { RestrictionNodeType } from '@/shared/src/restriction-tree/types'

export default defineComponent({
  components: {
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
